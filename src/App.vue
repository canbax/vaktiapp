<script setup lang="ts">
import { ref } from "vue";
import DailyPrayTimes from "./components/DailyPrayTimes.vue";
import { HourString, RemainingTimeFormat } from "./types";
// const locale = inject<Ref<string>>("currentLocale");

const menuItems: {
  icon: string;
  title: string;
  idx: number;
}[] = [
  { icon: "mdi-clock-time-four-outline", title: "times", idx: 0 },
  { icon: "mdi-map-marker-plus", title: "addNewLocation", idx: 1 },
  { icon: "mdi-calendar-month-outline", title: "sabbaticals", idx: 2 },
  { icon: "mdi-cog-outline", title: "settings", idx: 3 },
  { icon: "mdi-information-outline", title: "about", idx: 4 },
];

const isSideBarOpen = ref(true);

function switchNavigationDrawer() {
  isSideBarOpen.value = !isSideBarOpen.value;
}

// function changeLang() {
//   console.log("locale", locale?.value);
//   if (locale) {
//     locale.value = "tr";
//   }
// }

let currTimes: HourString[] = [
  "05:42",
  "07:07",
  "12:37",
  "15:29",
  "17:58",
  "19:16",
];

let remainTimeFmt: RemainingTimeFormat = "X hour Y minute Z second";

// function showTodayTimesData() {
//   console.log("show today");
// }
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="isSideBarOpen">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        link
        @click="isSideBarOpen = false"
      >
        <template #prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar title="Application bar">
      <template #prepend>
        <v-app-bar-nav-icon
          color="primary"
          @click="switchNavigationDrawer"
        ></v-app-bar-nav-icon>
      </template>

      <template #append>
        <v-btn icon="mdi-sync" color="primary"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <daily-pray-times
        :is-showing-today="true"
        :curr-times="currTimes"
        :remaining-time-format="remainTimeFmt"
      ></daily-pray-times>
    </v-main>
  </v-app>
</template>

<style scoped></style>
