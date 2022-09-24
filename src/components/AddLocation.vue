<template>
  <div>
    <v-autocomplete
      class="m5"
      v-model="selectedCountry"
      :items="countries"
      :filter="filterByTxt"
      item-text="UlkeAdi"
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
import { Country, City, District } from "../MetaType";
import { ApiClient } from "../ApiClient";
import { SettingService } from "../SettingService";
import { turkishDateStr2Date } from "@/helper";

@Component
export default class AddLocation extends Vue {
  private selectedCountry: Country | null = null;
  private selectedCity: City | null = null;
  private selectedDistrict: District | null = null;
  private countries = COUNTRIES;
  private cities: City[] = [];
  private districts: District[] = [];
  private _api: ApiClient = new ApiClient();
  private openPanels: number[] = [];

  // special life-cycle hook for vue
  created(): void {
    this._api = new ApiClient();
    if (!SettingService.getCurrLocation()) {
      this.openPanels = [0];
    }
  }

  onThemeSelected(e: string): void {
    if (e) {
      SettingService.setCurrTheme(e);
      this.$vuetify.theme.dark = e === "Dark";
    }
  }

  onCountrySelected(c: Country): void {
    // Turkey is cached
    if (c.UlkeAdi == "TURKIYE") {
      this.cities = TR_CITIES;
      this.selectedCity = null;
      this.selectedDistrict = null;
    } else {
      this._api.getCities4Country(c.UlkeID, (e) => {
        this.cities = e;
        this.selectedCity = null;
        this.selectedDistrict = null;
      });
    }
  }

  onCitySelected(c: City): void {
    const country = this.selectedCountry ? this.selectedCountry.UlkeID : "";
    this._api.getDistricts4City(country, c.SehirID, (e) => {
      this.districts = e;
    });
  }

  onDistrictSelected(d: District): void {
    this._api.getTimes4District(d.IlceID, (e) => {
      if (
        this.selectedCountry != null &&
        this.selectedCity != null &&
        this.selectedDistrict != null
      ) {
        const unix_date = turkishDateStr2Date(e[0][0]);
        const id =
          this.selectedCountry.UlkeID +
          "_" +
          this.selectedCity.SehirID +
          "_" +
          this.selectedDistrict.IlceID +
          "_" +
          unix_date;
        SettingService.addTimesData(id, e, d.IlceAdi);
        this.$emit("curr-times-updated", e);
      }
    });
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
