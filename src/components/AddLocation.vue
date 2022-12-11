<template>
  <div>
    <v-autocomplete
      class="m5"
      v-model="selectedCountry"
      :items="countries"
      :filter="filterByTxt"
      item-text="name"
      autocomplete="new-password"
      v-on:input="onCountrySelected"
      :placeholder="$t('selectCountry')"
      return-object
    />
    <br />
    <v-autocomplete
      class="m5"
      v-model="selectedCity"
      :disabled="selectedCountry == null"
      :items="cities"
      :filter="filterByTxt"
      item-text="SehirAdi"
      autocomplete="new-password"
      v-on:input="onCitySelected"
      :label="$t('selectCity')"
      :placeholder="$t('selectCity')"
      return-object
    />
    <br />
    <v-autocomplete
      v-if="!isTurkeySelected"
      class="m5"
      v-model="selectedDistrict"
      :disabled="selectedCity == null"
      :items="districts"
      :filter="filterByTxt"
      item-text="IlceAdi"
      autocomplete="new-password"
      v-on:input="onDistrictSelected"
      :label="$t('selectDistrict')"
      :placeholder="$t('selectDistrict')"
      return-object
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import COUNTRIES from "../assets/countries.json";
import TR_CITIES from "../assets/cities.json";
import { Country, TimesForLocale } from "../MetaType";
import { ApiClient } from "../ApiClient";
import { SettingService } from "../SettingService";
import { turkishDateStr2Date } from "@/helper";

@Component
export default class AddLocation extends Vue {
  selectedCountry: Country | null = null;
  selectedCity: string | null = null;
  selectedDistrict: string | null = null;
  countries: Country[] = COUNTRIES;
  cities: string[] = [];
  districts: string[] = [];
  private _api: ApiClient = new ApiClient();
  private openPanels: number[] = [];

  // special life-cycle hook for vue
  created(): void {
    this._api = new ApiClient();
    if (!SettingService.getCurrLocation()) {
      this.openPanels = [0];
    }
    const currlang = SettingService.getCurrLang() || "TR";
    let regionNames = new Intl.DisplayNames([currlang], { type: "region" });
    for (let i = 0; i < this.countries.length; i++) {
      this.countries[i].name = regionNames.of(this.countries[i].code) || "";
    }
  }

  onThemeSelected(e: string): void {
    if (e) {
      SettingService.setCurrTheme(e);
      this.$vuetify.theme.dark = e === "Dark";
    }
  }

  get isTurkeySelected(): boolean {
    return this.selectedCountry !== null && this.selectedCountry.code == "TR";
  }

  onCountrySelected(c: Country): void {
    // Turkey is cached
    if (c.code == "TR") {
      this.cities = TR_CITIES;
      this.selectedCity = null;
      this.selectedDistrict = null;
    } else {
      this._api.getCities4Country(c.englishName, (e) => {
        this.cities = e;
        this.selectedCity = null;
        this.selectedDistrict = null;
      });
    }
  }

  onCitySelected(c: string): void {
    const country = this.selectedCountry
      ? this.selectedCountry.englishName
      : "";
    this._api.getDistricts4City(country, c, (e) => {
      this.districts = e;
      if (this.isTurkeySelected) {
        this.onDistrictSelected(this.districts[0]);
      }
    });
  }

  onDistrictSelected(d: string): void {
    this._api.getTimes4District(
      {
        country: this.selectedCountry?.englishName ?? "",
        region: this.selectedCity ?? "",
        city: this.selectedDistrict ?? "",
      },
      (e: TimesForLocale) => {
        if (
          this.selectedCountry != null &&
          this.selectedCity != null &&
          this.selectedDistrict != null
        ) {
          const unix_date = turkishDateStr2Date(e.times[]);
          const id =
            this.selectedCountry.name +
            "_" +
            this.selectedCity +
            "_" +
            this.selectedDistrict +
            "_" +
            unix_date;
          SettingService.addTimesData(id, e, d);
          this.$emit("curr-times-updated", e);
        }
      }
    );
  }

  filterByTxt(item: Country, queryText: string, itemText: string): boolean {
    return itemText.toLowerCase().includes(queryText.toLowerCase());
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.m5 {
  margin: 5px;
}
</style>
