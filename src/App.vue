<template>
  <v-app>
    <v-navigation-drawer
      v-model="isSideBarOpen"
      app
      v-bind:style="{ zoom: currZoom + '%' }"
    >
      <v-list nav dense>
        <v-list-item-group mandatory v-model="selectedItem">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            link
            @click="isSideBarOpen = false"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense v-bind:style="{ zoom: currZoom + '%' }">
      <v-app-bar-nav-icon
        @click.stop="isSideBarOpen = !isSideBarOpen"
        color="primary"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <span v-if="selectedItem == 0">{{ currLoc }}</span>
        <span v-if="selectedItem == 1">{{ $t("addNewLocation") }}</span>
        <span v-if="selectedItem == 2">{{ $t("sabbaticals") }}</span>
        <span v-if="selectedItem == 3">{{ $t("settings") }}</span>
        <span v-if="selectedItem == 4">{{ $t("about") }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="selectedItem == 0"
        v-on:click="updateTimes4Current()"
        icon
        color="primary"
      >
        <v-icon>mdi-sync</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main v-bind:style="{ zoom: currZoom + '%' }" class="m5">
      <div v-bind:class="{ h0: isLoading || isError }">
        <div v-bind:class="currSlideCss" v-if="selectedItem == 0">
          <div class="txt-center" v-if="!currTimes || !currTimes[currDayIdx]">
            <h2 class="normal-font">{{ $t("noTimeData") }}</h2>
          </div>
          <div class="txt-center" v-if="currTimes && currTimes[currDayIdx]">
            <h2 class="normal-font" style="white-space: pre">
              {{ currGreDate }}
            </h2>
            <h4 class="normal-font" v-if="isShowCurrHijri">
              {{ currHijriDate }}
            </h4>
          </div>
          <v-divider></v-divider>
          <div class="txt-center">
            <div class="horizontal">
              <v-btn
                x-large
                v-on:click="decreaseCurrDay()"
                icon
                color="primary"
              >
                <v-icon x-large>mdi-calendar-arrow-left</v-icon>
              </v-btn>
              <div>
                <table class="m5">
                  <tbody>
                    <tr v-for="(item, i) in timeItems" :key="i" class="m5">
                      <td style="text-align: right; padding-right: 10px">
                        <h2
                          v-bind:class="{ 'normal-font': i != currPrayIdx - 1 }"
                        >
                          {{ item }}
                        </h2>
                      </td>
                      <td style="text-align: left">
                        <h2
                          v-bind:class="{ 'normal-font': i != currPrayIdx - 1 }"
                        >
                          {{ currTimes[currDayIdx][i + 1] }}
                          <v-icon
                            v-if="i == currPrayIdx - 1"
                            style="vertical-align: initial"
                          >
                            mdi-clock
                          </v-icon>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <v-btn
                x-large
                v-on:click="increaseCurrDay()"
                icon
                color="primary"
              >
                <v-icon x-large>mdi-calendar-arrow-right</v-icon>
              </v-btn>
            </div>
            <v-divider></v-divider>
            <div v-if="isShowingToday">
              <span class="normal-font">
                {{ timeItems[currPrayIdx - 1] }} &nbsp;
                {{ $t("remainingTime") }}
              </span>
              <h2>{{ remainingTime }}</h2>
            </div>
            <div v-else>
              <v-btn x-large v-on:click="setCurrDayIdx()" icon color="primary">
                <v-icon x-large>mdi-calendar-today</v-icon>
              </v-btn>
            </div>
            <v-snackbar v-model="isShowNearestSabb" timeout="-1">
              <h4 class="normal-font glow">{{ nearSabbaticalStr }}</h4>
              <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="isShowNearestSabb = false">
                  <v-icon x-large>mdi-close-circle</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
          </div>
        </div>
        <AddLocation
          v-if="selectedItem == 1"
          v-on:curr-times-updated="currTimesUpdated($event)"
        />
        <Sabbaticals v-if="selectedItem == 2" />
        <Settings
          v-if="selectedItem == 3"
          v-on:curr-times-updated="currTimesUpdated($event)"
          v-on:lang-selected="langSelected($event)"
          v-on:zoom-changed="zoomChanged($event)"
          v-on:is-show-hijri-changed="isShowHijriChanged($event)"
          v-on:date-fmt-changed="setDateStrs()"
        />
        <About v-if="selectedItem == 4" />
      </div>

      <div class="spinner-container" v-if="isLoading && !isError">
        <v-progress-circular
          color="primary"
          :size="100"
          :width="8"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-if="isError">
        <v-alert outlined type="error" prominent border="left">
          <h1>{{ $t("InternetErr") }}</h1>
        </v-alert>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// Bismillahirrahmanirrahim بسم الله الرحمن الرحيم
import { Component, Vue } from "vue-property-decorator";
import AddLocation from "./components/AddLocation.vue";
import Settings from "./components/Settings.vue";
import Sabbaticals from "./components/Sabbaticals.vue";
import About from "./components/About.vue";
import { SettingService } from "./SettingService";
import { StateService } from "./StateService";
import { HijriDate } from "./HijriDate";

import {
  date2TurkishStr,
  decodeHTML,
  gre2str,
  seconds2str,
  strTime2TotalSec,
  turkishDateStr2Date,
} from "./helper";
import { ApiClient } from "./ApiClient";

@Component({
  components: {
    AddLocation,
    Settings,
    Sabbaticals,
    About,
  },
})
export default class App extends Vue {
  private isSideBarOpen = false;
  // array of array of strings, first is the date the rest 6 are times for prayings
  private currTimes: string[][] | null = null;
  private currDayIdx = 0;
  private currLoc: string | null = "";
  private currPrayIdx = 2;
  private remainingTime = "";
  private timeItems: string[] = [];
  private currLang = SettingService.getCurrLang();
  private _api: ApiClient = new ApiClient();
  private currZoom = 100;
  private hijri = new HijriDate();
  private currHijriDate = "";
  private currGreDate = "";
  private isShowingToday = true;
  private currSlideCss = "";
  private isShowCurrHijri = true;
  private menuItems: { icon: string; title: string; idx: number }[] = [
    { icon: "mdi-clock-time-four-outline", title: "times", idx: 0 },
    { icon: "mdi-map-marker-plus", title: "addNewLocation", idx: 1 },
    { icon: "mdi-calendar-month-outline", title: "sabbaticals", idx: 2 },
    { icon: "mdi-cog-outline", title: "settings", idx: 3 },
    { icon: "mdi-information-outline", title: "about", idx: 4 },
  ];
  private selectedItem = 0;
  private isLoading = false;
  private isError = false;
  private nearSabbaticalStr: string | null = null;
  private isShowNearestSabb = false;
  private readonly PRE_SABB_LIMIT = 4;
  private readonly SLIDE_ANIM_DUR = 500;
  private readonly ALERT_DUR = 3000;

  created(): void {
    this._api = new ApiClient();
    this.currLang = SettingService.getCurrLang();
    if (this.currLang) {
      this.$i18n.locale = this.currLang;
    } else {
      // set default language if it does not exist
      this.$i18n.locale = "TR";
      this.currLang = "TR";
      SettingService.setCurrLang("TR");
    }

    const currTheme = SettingService.getCurrTheme();
    this.$vuetify.theme.dark = currTheme === "Dark";
    this.langSelected();
    this.currTimes = SettingService.getTimes4CurrentLocation();
    this.decodeCurrTimes();
    this.currLoc = SettingService.getCurrLocation();
    this.currZoom = SettingService.getCurrZoom();
    this.isShowCurrHijri = SettingService.getIsShowHijri();
    this.setCurrDayIdx();
    // update remaining time for current pray every second
    setInterval(() => {
      this.updateRemainingTime();
    }, 1000);

    // update current pray index every minute
    this.updateCurrPrayIdx();
    setInterval(() => {
      this.updateCurrPrayIdx();
    }, 60000);

    StateService.addLoadingListener((x: boolean) => {
      this.isLoading = x;
    });
    StateService.addErrorListener((x: boolean) => {
      this.isError = x;
      setTimeout(() => {
        this.isError = false;
      }, this.ALERT_DUR);
    });
  }

  setCurrDayIdx(): void {
    if (!this.currTimes) {
      console.log("times data not exists");
      this.isSideBarOpen = true;
      this.selectedItem = 1;
      return;
    }
    this.currSlideCss = "zoom-css";
    const today = new Date();
    let idx = 0;
    for (const d of this.currTimes) {
      if (d[0].toLowerCase().includes(date2TurkishStr(today).toLowerCase())) {
        this.currDayIdx = idx;
        this.setDateStrs();
        this.setIsShowingToday();
        return;
      }
      idx++;
    }
    console.log("current day not found in current times data");
    this.updateTimes4Current();
  }

  increaseCurrDay(): void {
    if (!this.currTimes) {
      return;
    }
    if (this.currDayIdx < this.currTimes.length - 1) {
      this.currSlideCss = "slide-r2l";
      setTimeout(() => {
        this.currSlideCss = "";
      }, this.SLIDE_ANIM_DUR);
      // change UI faster so that User won't see changing values
      setTimeout(() => {
        this.currDayIdx++;
        this.setDateStrs();
        this.setIsShowingToday();
      }, this.SLIDE_ANIM_DUR / 2);
    }
  }

  decreaseCurrDay(): void {
    if (this.currDayIdx > 0) {
      this.currSlideCss = "slide-l2r";
      setTimeout(() => {
        this.currSlideCss = "";
      }, this.SLIDE_ANIM_DUR);
      setTimeout(() => {
        this.currDayIdx--;
        this.setDateStrs();
        this.setIsShowingToday();
      }, this.SLIDE_ANIM_DUR / 2);
    }
  }

  currTimesUpdated(data: string[][] | null): void {
    this.langSelected();
    this.selectedItem = 0;
    this.currTimes = data;
    this.decodeCurrTimes();
    this.setCurrDayIdx();
    this.currLoc = SettingService.getCurrLocation();
  }

  langSelected(): void {
    this.timeItems = [];
    for (let i = 0; i < 6; i++) {
      this.timeItems.push(this.$tc("timeItem" + i));
    }
    this.currLang = SettingService.getCurrLang();
    this.setDateStrs();
  }

  zoomChanged(isIncrease: boolean): void {
    if (isIncrease) {
      if (this.currZoom < 400) {
        this.currZoom = this.currZoom + 10;
      }
    } else {
      if (this.currZoom > 20) {
        this.currZoom = this.currZoom - 10;
      }
    }
    SettingService.setCurrZoom(this.currZoom);
  }

  isShowHijriChanged(isShow: boolean): void {
    this.isShowCurrHijri = isShow;
  }

  setDateStrs(): void {
    setTimeout(() => {
      if (!this.currTimes || !this.currTimes[this.currDayIdx]) {
        return;
      }
      const date = new Date(
        turkishDateStr2Date(this.currTimes[this.currDayIdx][0])
      );
      const hij = this.hijri.toHijri(date);
      this.currHijriDate = this.hijri2str(hij);
      this.currGreDate = this.gre2str(date);
      this.setNearestSabbatical(date);
    }, 0);
  }

  setNearestSabbatical(date: Date): void {
    const sabb = this.hijri.getNearestSabbatical(date);
    if (sabb.cnt < this.PRE_SABB_LIMIT) {
      if (sabb.sabb?.name) {
        if (sabb.cnt === 1) {
          this.nearSabbaticalStr =
            this.$tc("tomorrow") + " " + this.$tc(sabb.sabb?.name);
        } else {
          if (sabb.cnt == 0) {
            this.nearSabbaticalStr = this.$tc(sabb.sabb?.name);
          } else {
            this.nearSabbaticalStr = `${sabb.cnt} ${this.$tc(
              "daysLater"
            )} ${this.$tc(sabb.sabb?.name)}`;
          }
        }
      }
    } else {
      this.nearSabbaticalStr = null;
    }
    this.isShowNearestSabb = this.nearSabbaticalStr !== null;
  }

  setIsShowingToday(): void {
    if (!this.currTimes || !this.currTimes[this.currDayIdx]) {
      return;
    }
    const t = new Date();
    const d = new Date(turkishDateStr2Date(this.currTimes[this.currDayIdx][0]));
    this.isShowingToday =
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear() &&
      d.getDate() == t.getDate();
  }

  private hijri2str(h: HijriDate): string {
    return (
      h.getDay() +
      " " +
      this.$t("hijriMonth" + h.getMonth()) +
      " " +
      h.getYear()
    );
  }

  private decodeCurrTimes(): void {
    if (!this.currTimes) {
      return;
    }
    for (let i = 0; i < this.currTimes.length; i++) {
      for (let j = 0; j < this.currTimes[i].length; j++) {
        this.currTimes[i][j] = decodeHTML(this.currTimes[i][j]);
      }
    }
  }

  private updateTimes4Current(): void {
    const k = SettingService.getDataKey4CurrentLocation();
    if (!k) {
      return;
    }
    const arr = k.split("_");

    this._api.getTimes4District(arr[arr.length - 2], (e) => {
      const unix_date = turkishDateStr2Date(decodeHTML(e[0][0]));
      const id = arr.slice(0, -1).join("_") + "_" + unix_date;
      const loc = SettingService.getCurrLocation();
      if (loc) {
        SettingService.addTimesData(id, e, loc);
      }
    });
  }

  private updateRemainingTime(): void {
    if (!this.currTimes) {
      return;
    }
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const sec = d.getSeconds();
    const currSeconds = h * 3600 + m * 60 + sec;
    const prayTimeInSeconds = strTime2TotalSec(
      this.currTimes[this.currDayIdx][this.currPrayIdx]
    );
    if (currSeconds > prayTimeInSeconds && this.currPrayIdx != 1) {
      this.updateCurrPrayIdx();
      return;
    }
    let secDiff = prayTimeInSeconds - currSeconds;
    // means we should measure time difference for the next day
    if (secDiff < 0) {
      secDiff = 86400 - currSeconds + prayTimeInSeconds;
    }
    this.remainingTime = seconds2str(
      secDiff,
      this.$t("hour") + "",
      this.$t("minute") + "",
      this.$t("second") + ""
    );
  }

  private updateCurrPrayIdx(): void {
    if (!this.currTimes) {
      return;
    }
    const d = new Date();
    this.setCurrDayIdx();
    const h = d.getHours();
    const m = d.getMinutes();
    const totalSec = h * 3600 + m * 60;
    // if not found a greater total seconds it means it is the first
    this.currPrayIdx = 1;
    // first item in `currTimes` is date
    for (let i = 1; i < this.timeItems.length + 1; i++) {
      const curr = this.currTimes[this.currDayIdx][i];
      const totalSec2 = strTime2TotalSec(curr);
      if (totalSec < totalSec2) {
        this.currPrayIdx = i;
        break;
      }
    }
  }

  // this function is a copy paste. I couldn't find a good way of a defining shared function that uses Vue-i18n
  private gre2str(d: Date): string {
    let m = this.$t("month" + d.getMonth()).toString();
    let wd = this.$t("weekday" + d.getDay()).toString();
    let wds = this.$t("weekdayShort" + d.getDay()).toString();
    return gre2str(d, m, wd, wds);
  }
}
</script>

<style>
.txt-center {
  text-align: center;
}
.normal-font {
  font-weight: normal;
}
.m5 {
  margin: 5px;
}
.p5 {
  padding: 5px;
}
.h0 {
  display: none;
}
.spinner-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.glow {
  text-align: center;
  -webkit-animation: glow 1s ease-in-out 4 alternate;
  -moz-animation: glow 1s ease-in-out 4 alternate;
  animation: glow 1s ease-in-out 4 alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 0px primary;
  }

  to {
    text-shadow: 0 0 2px #1976d2;
  }
}

.horizontal {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

:root {
  --animdur: 0.5s;
}

.slide-r2l {
  position: relative;
  animation: slide var(--animdur) ease-in-out 0s 1 normal;
}

@keyframes slide {
  0% {
    left: 0px;
  }
  100% {
    left: -100%;
  }
}

.slide-l2r {
  position: relative;
  animation: slide2 var(--animdur) ease-in-out 0s 1 normal;
}

@keyframes slide2 {
  0% {
    left: 0px;
  }
  100% {
    left: 100%;
  }
}

.zoom-css {
  animation: zoom var(--animdur) ease-in-out 0s 1 normal;
}

@keyframes zoom {
  0% {
    transform: scale(0.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
