<script setup lang="ts">
import { useRoute } from "@/composables/route";
import { PathMenuItem } from "@/types";
import LocationSelectDialog from "@/components/LocationSelectDialog.vue";
import ShareTimes from "@/components/ShareTimes.vue";
import { useUIState } from "@/composables/userInterfaceState";
import { computed } from "vue";

const {
  currentView,
  currentPathMenuItem,
  pathMenuItems,
  setViewFromPathMenuItem,
  isWidget,
} = useRoute();

const { isSideBarOpen, currentZoom } = useUIState();

function switchNavigationDrawer() {
  isSideBarOpen.value = !isSideBarOpen.value;
}

const isTimesShown = computed<boolean>(
  () => currentPathMenuItem.value === "times"
);

const isAboutShown = computed<boolean>(
  () => currentPathMenuItem.value === "about"
);

function openGitHubSponsors() {
  window.open("https://github.com/sponsors/canbax", "_blank");
}

function clickToHref(_, item: PathMenuItem) {
  isSideBarOpen.value = false;
  history.pushState({}, "", "/" + item.title);
  setViewFromPathMenuItem(item);
}
</script>

<template>
  <v-card v-if="!isWidget" data-testid="container-card" class="dynamic-zoom">
    <v-layout>
      <v-navigation-drawer v-model="isSideBarOpen">
        <v-list-item
          v-for="item in pathMenuItems"
          :key="item.title"
          link
          @click="clickToHref($event, item)"
        >
          <template #prepend>
            <v-icon :icon="item.icon" />
          </template>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item>
      </v-navigation-drawer>

      <v-app-bar>
        <template #prepend>
          <v-app-bar-nav-icon color="primary" @click="switchNavigationDrawer" />
        </template>

        <template #title>
          <v-app-bar-title>
            {{ $t(currentPathMenuItem) }}
          </v-app-bar-title>
        </template>

        <template #default v-if="isTimesShown || isAboutShown">
          <LocationSelectDialog v-if="isTimesShown" />
          <v-btn
            v-else-if="isAboutShown"
            variant="outlined"
            class="text-capitalize ma-2"
            @click="openGitHubSponsors"
            prepend-icon="mdi-github"
          >
            GitHub
          </v-btn>
        </template>

        <template #append v-if="isTimesShown">
          <ShareTimes />
        </template>
      </v-app-bar>

      <v-main>
        <component :is="currentView" />
      </v-main>
    </v-layout>
  </v-card>

  <component v-else :is="currentView" />
</template>

<style scoped>
.dynamic-zoom {
  zoom: v-bind(currentZoom);
}
</style>
