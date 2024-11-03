<script setup lang="ts">
import { useRoute } from "@/composables/route";
import { PathMenuItem } from "@/types";
import LocationSelector from "@/components/LocationSelector.vue";
import { useUIState } from "@/composables/userInterfaceState";
import { computed } from "vue";
// const locale = inject<Ref<string>>("currentLocale");

const {
  currentView,
  currentPathMenuItem,
  pathMenuItems,
  setViewFromPathMenuItem,
} = useRoute();

const { isSideBarOpen } = useUIState();

function switchNavigationDrawer() {
  isSideBarOpen.value = !isSideBarOpen.value;
}

const isTimesShown = computed<boolean>(
  () => currentPathMenuItem.value === "times"
);

// function changeLang() {
//   console.log("locale", locale?.value);
//   if (locale) {
//     locale.value = "tr";
//   }
// }

// function showTodayTimesData() {
//   console.log("show today");
// }
function clickToHref(_, item: PathMenuItem) {
  isSideBarOpen.value = false;
  history.pushState({}, "", "/" + item.title);
  setViewFromPathMenuItem(item);
}
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="isSideBarOpen">
      <v-list-item
        v-for="item in pathMenuItems"
        :key="item.title"
        link
        @click="clickToHref($event, item)"
      >
        <template #prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon
          color="primary"
          @click="switchNavigationDrawer"
        ></v-app-bar-nav-icon>
      </template>

      <template #title>
        <v-app-bar-title>
          {{ $t(currentPathMenuItem) }}
        </v-app-bar-title>
      </template>

      <template #default v-if="isTimesShown">
        <LocationSelector />
      </template>

      <template #append v-if="isTimesShown">
        <v-btn icon="mdi-sync" color="primary"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <component :is="currentView" />
    </v-main>
  </v-app>
</template>

<style scoped></style>
