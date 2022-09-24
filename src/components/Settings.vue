<template>
  <v-container fluid>
    <v-select
      class="unselectable-txt"
      autocomplete="new-password"
      v-model="currLocation"
      :items="savedLocations"
      v-on:input="onSavedLocationSelected"
      :label="$t('changeLocation')"
      :placeholder="$t('changeLocation')"
    />
    <v-select
      v-model="currLang"
      autocomplete="new-password"
      :items="langs"
      item-text="txt"
      v-on:input="onLangSelected"
      :label="$t('selectLanguage')"
      :placeholder="$t('selectLanguage')"
      return-object
    />
    <v-select
      v-model="currTheme"
      :items="themes"
      v-on:input="onThemeSelected"
      :label="$t('selectTheme')"
      :placeholder="$t('selectTheme')"
    />
    <v-checkbox
      v-model="isShowHijriDate"
      @click="isShowHijriClicked()"
      :label="$t('isShowHijriDate')"
    />
    <v-sheet rounded elevation="2" class="m5 p5">
      <div v-if="currLang && currLang.code == 'tr'">
        <span>{{ $t("changeZoom") }} (%{{ currZoom }})</span>
      </div>
      <div v-else>
        <span>{{ $t("changeZoom") }} ({{ currZoom }}%)</span>
      </div>
      <div style="heigth: 100px">
        <v-btn v-on:click="zoomIn()" icon color="primary">
          <v-icon>mdi-magnify-plus</v-icon>
        </v-btn>
        <v-btn v-on:click="zoomOut()" icon color="primary">
          <v-icon>mdi-magnify-minus</v-icon>
        </v-btn>
      </div>
    </v-sheet>
    <!-- date format -->
    <v-sheet rounded elevation="2" class="m5 p5">
      <span>{{ $t("dateFormat") }}</span>
      <div class="m5">
        <v-row align="center">
          <v-col class="d-flex" cols="4">
            <v-select
              v-model="currYearFormat"
              :items="yearFormats"
              v-on:input="
                (x) => {
                  onDateFormatSelected(x, 0);
                }
              "
              :label="$t('yearFormat')"
              :placeholder="$t('yearFormat')"
            />
          </v-col>
          <v-col class="d-flex" cols="4">
            <v-select
              v-model="currMonthFormat"
              :items="monthFormats"
              v-on:input="
                (x) => {
                  onDateFormatSelected(x, 1);
                }
              "
              :label="$t('monthFormat')"
              :placeholder="$t('monthFormat')"
            />
          </v-col>
          <v-col class="d-flex" cols="4">
            <v-select
              v-model="currWeekdayFormat"
              :items="weekdayFormats"
              v-on:input="
                (x) => {
                  onDateFormatSelected(x, 2);
                }
              "
              :label="$t('weekdayFormat')"
              :placeholder="$t('weekdayFormat')"
            />
          </v-col>
        </v-row>
        <h3 class="txt-center" v-bind:class="sampleDateCss">
          {{ sampleDate }}
        </h3>
      </div>
    </v-sheet>
    <!-- remaining time format -->
    <v-sheet rounded elevation="2" class="m5 p5">
      <span>{{ $t("remainingTimeFormat") }}</span>
      <v-select
        v-model="currTimeFmt"
        :items="remainingTimeFormats"
        v-on:input="onRemainingTimeFmtChanged"
        :label="$t('remainingTimeFormat')"
        :placeholder="$t('remainingTimeFormat')"
      />
      <h3 class="txt-center" v-bind:class="sampleRemainingTimeCss">
        {{ sampleRemainingTime }}
      </h3>
    </v-sheet>
    <!-- <v-btn v-on:click="clearAllData()" color="primary">
      Clear All Data
    </v-btn> -->
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Country, UiLanguage } from "../MetaType";
import { ApiClient } from "../ApiClient";
import { SettingService } from "../SettingService";
import { gre2str, seconds2str } from "@/helper";

@Component
export default class Settings extends Vue {
  private savedLocations: string[] = [];
  private themes = ["Light", "Dark"];
  private langs: UiLanguage[] = [
    { txt: "Türkçe", code: "tr" },
    { txt: "English", code: "en" },
    { txt: "Pусский", code: "ru" },
    { txt: "Española", code: "es" },
    { txt: "فارسی", code: "fa" },
    { txt: "Français", code: "fr" },
    { txt: "Deutsch", code: "de" },
    { txt: "Chinese", code: "zh" },
    { txt: "عربى", code: "ar" },
    { txt: "Indonesia", code: "id" },
    { txt: "Italian", code: "it" },
    { txt: "Kazakh", code: "kk" },
    { txt: "Korean", code: "ko" },
    { txt: "Kyrgyz", code: "ky" },
    { txt: "Malay", code: "ms" },
  ];
  private _api: ApiClient = new ApiClient();
  private currLocation: string | null = "";
  private currTheme: string | null = "";
  private currLang: UiLanguage | undefined = undefined;
  private currZoom = 100;
  private isShowHijriDate = true;
  private yearFormats: string[] = ["YYYY", "YY", "-"];
  private monthFormats: string[] = ["MMMM", "MMM", "MM"];
  private weekdayFormats: string[] = ["DDDD", "DDD", "-"];
  private remainingTimeFormats = [
    "XX:YY:ZZ",
    "XX:YY",
    `X ${this.$t("hour")} Y ${this.$t("minute")} Z ${this.$t("second")}`,
    `X ${this.$t("hour")} Y ${this.$t("minute")}`,
  ];
  private currTimeFmt = this.remainingTimeFormats[0];
  private currYearFormat = "";
  private currMonthFormat = "";
  private currWeekdayFormat = "";
  private sampleDate = "";
  private sampleDateCss = "";
  private readonly DATE_ANIM_DUR = 4000;
  private sampleRemainingTime = "";
  private sampleRemainingTimeCss = "";

  // special life-cycle hook for vue
  created(): void {
    this._api = new ApiClient();
    this.savedLocations = SettingService.getSavedLocations();
    this.currLocation = SettingService.getCurrLocation();
    this.currTheme = SettingService.getCurrTheme();
    this.currZoom = SettingService.getCurrZoom();
    this.currYearFormat = SettingService.getCurrYearFormat();
    this.currMonthFormat = SettingService.getCurrMonthFormat();
    this.currWeekdayFormat = SettingService.getCurrWeekdayFormat();
    this.currTimeFmt = this.remainingTimeFormats[
      SettingService.getCurrTimeFmt()
    ];

    this.isShowHijriDate = SettingService.getIsShowHijri();

    this.currLang = this.langs.find(
      (x) => x.code === SettingService.getCurrLang()
    );
    if (!this.currLang) {
      this.currLang = this.langs[1]; // default is turkish
    }
    if (!this.currTheme) {
      this.currTheme = "Light";
    }
    this.onLangSelected(this.currLang);
    this.$vuetify.theme.dark = this.currTheme === "Dark";
    this.setSampleDateTimes();
  }

  onThemeSelected(e: string): void {
    if (e) {
      SettingService.setCurrTheme(e);
      this.$vuetify.theme.dark = e === "Dark";
    }
  }

  onRemainingTimeFmtChanged(): void {
    let idx = this.remainingTimeFormats.findIndex(
      (x) => x === this.currTimeFmt
    );
    if (idx < 0) {
      idx = 0;
    }
    SettingService.setCurrTimeFmt(idx);
    this.sampleRemainingTimeCss = "glow";
    setTimeout(() => {
      this.sampleRemainingTimeCss = "";
    }, this.DATE_ANIM_DUR);
    this.sampleRemainingTime = seconds2str(
      3919,
      this.$t("hour") + "",
      this.$t("minute") + "",
      this.$t("second") + ""
    );
  }

  onDateFormatSelected(e: string, n = 0): void {
    if (e) {
      if (n === 0) {
        SettingService.setCurrYearFormat(e);
      } else if (n === 1) {
        SettingService.setCurrMonthFormat(e);
      } else if (n === 2) {
        SettingService.setCurrWeekdayFormat(e);
      }
      this.sampleDate = this.gre2str();
      this.sampleDateCss = "glow";
      setTimeout(() => {
        this.sampleDateCss = "";
      }, this.DATE_ANIM_DUR);
      this.$emit("date-fmt-changed");
    }
  }

  onLangSelected(e: { txt: string; code: string }): void {
    if (e) {
      setTimeout(() => {
        this.remainingTimeFormats = [
          "XX:YY:ZZ",
          "XX:YY",
          `X ${this.$t("hour")} Y ${this.$t("minute")} Z ${this.$t("second")}`,
          `X ${this.$t("hour")} Y ${this.$t("minute")}`,
        ];
        this.currTimeFmt = this.remainingTimeFormats[
          SettingService.getCurrTimeFmt()
        ];
      }, 0);
      SettingService.setCurrLang(e.code);
      this.$i18n.locale = e.code;
      for (let i = 0; i < this.themes.length; i++) {
        this.themes[i] = this.$tc(this.themes[i]);
      }
      SettingService.setCurrTheme(this.currTheme || "Light");
      this.$emit("lang-selected", e.code);
      this.setSampleDateTimes();
    }
  }

  setSampleDateTimes(): void {
    this.sampleDate = this.gre2str();
    this.sampleRemainingTime = seconds2str(
      3919,
      this.$t("hour") + "",
      this.$t("minute") + "",
      this.$t("second") + ""
    );
  }

  onSavedLocationSelected(e: string): void {
    SettingService.setCurrLocation(e);
    this.$emit("curr-times-updated", SettingService.getData4SavedLocation(e));
  }

  filterByTxt(item: Country, queryText: string, itemText: string): boolean {
    return itemText.toLowerCase().includes(queryText.toLowerCase());
  }

  zoomIn(): void {
    this.$emit("zoom-changed", true);
    this.currZoom = SettingService.getCurrZoom();
  }

  zoomOut(): void {
    this.$emit("zoom-changed", false);
    this.currZoom = SettingService.getCurrZoom();
  }

  clearAllData() {
    localStorage.clear();
  }

  isShowHijriClicked(): void {
    SettingService.setIsShowHijri(this.isShowHijriDate);
    this.$emit("is-show-hijri-changed", this.isShowHijriDate);
  }

  // this function is a copy paste. I couldn't find a good way of a defining shared function that uses Vue-i18n
  private gre2str(): string {
    const d = new Date();
    let m = this.$t("month" + d.getMonth()).toString();
    let wd = this.$t("weekday" + d.getDay()).toString();
    let wds = this.$t("weekdayShort" + d.getDay()).toString();
    return gre2str(d, m, wd, wds);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.m5 {
  margin: 5px;
}
</style>
