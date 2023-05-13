<script setup lang="ts">
import { ref, inject, type Ref } from "vue";
import DailyPrayTimes from "./components/DailyPrayTimes.vue";
const locale = inject<Ref<string>>("currentLocale");

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

function changeLang() {
  console.log("locale", locale?.value);
  if (locale) {
    locale.value = "tr";
  }
}

let currTimes = [
  { name: "imsak", value: "05:42" },
  { name: "sabah", value: "07:07" },
  { name: "öğle", value: "12:37" },
  { name: "ikindi", value: "15:29" },
  { name: "akşam", value: "17:58" },
  { name: "yatsı", value: "19:16" },
];
function showTodayTimesData() {
  console.log("show today");
}
</script>

<template>
  <v-app>
    <v-navigation-drawer :model-value="isSideBarOpen">
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
        @showToday=""
      ></daily-pray-times>
    </v-main>
  </v-app>
</template>

<style scoped></style>
