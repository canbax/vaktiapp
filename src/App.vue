<script setup lang="ts">
import { useRoute } from '@/composables/route';
import type { PathMenuItem } from '@/types';
import LocationSelectDialog from '@/components/LocationSelectDialog.vue';
import ShareTimes from '@/components/ShareTimes.vue';
import { useUIState } from '@/composables/userInterfaceState';
import { computed, onMounted } from 'vue';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

const { currentView, currentPathMenuItem, pathMenuItems, setViewFromPathMenuItem, isWidget } =
  useRoute();

const { isSideBarOpen, currentZoom } = useUIState();

function switchNavigationDrawer() {
  isSideBarOpen.value = !isSideBarOpen.value;
}

const isTimesShown = computed<boolean>(() => currentPathMenuItem.value === 'times');

const isAboutShown = computed<boolean>(() => currentPathMenuItem.value === 'about');

function openGitHubSponsors() {
  window.open('https://github.com/sponsors/canbax', '_blank');
}

function clickToHref(item: PathMenuItem) {
  isSideBarOpen.value = false;
  history.pushState({}, '', '/' + item.title);
  setViewFromPathMenuItem(item);
}
onMounted(async () => {
  if (Capacitor.isNativePlatform()) {
    // Prevent the status bar from overlaying the WebView
    await StatusBar.setOverlaysWebView({ overlay: false });

    // You might also want to set the style and background color for better aesthetics
    await StatusBar.setStyle({ style: Style.Default }); // Or Style.Dark, or Style.Default
    // await StatusBar.setBackgroundColor({ color: '#FFFFFF' }); // Set your desired background color
  }
});
</script>

<template>
  <div v-if="!isWidget" data-testid="container-card" class="dynamic-zoom">
    <v-layout>
      <v-app-bar prominent>
        <template #prepend>
          <v-app-bar-nav-icon
            data-testid="main-menu-btn"
            color="primary"
            @click="switchNavigationDrawer"
          />
        </template>

        <template #title>
          <v-app-bar-title>
            {{ $t(currentPathMenuItem ?? '') }}
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

      <v-navigation-drawer v-model="isSideBarOpen">
        <v-list-item
          v-for="item in pathMenuItems"
          :key="item.title"
          @click="clickToHref(item)"
          :slim="true"
          density="compact"
          lines="two"
        >
          <template #prepend>
            <v-icon :icon="item.icon" />
          </template>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item>
      </v-navigation-drawer>
      <v-main>
        <component :is="currentView" />
      </v-main>
    </v-layout>
  </div>

  <component v-else :is="currentView" />
</template>

<style scoped>
.dynamic-zoom {
  zoom: v-bind(currentZoom);
  /* Define fallback values for non-native environments or when not supported */
  --sat: env(safe-area-inset-top, 0px);
  --sab: env(safe-area-inset-bottom, 0px);
  --sal: env(safe-area-inset-left, 0px);
  --sar: env(safe-area-inset-right, 0px);
}
</style>
