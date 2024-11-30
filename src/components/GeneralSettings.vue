<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { useUIState } from "@/composables/userInterfaceState";
import LanguageSelector from "@/components/LanguageSelector.vue";
import ThemeSelector from "@/components/ThemeSelector.vue";
import { getCurrentInstance } from "vue";
import ZoomSlider from "@/components/ZoomSlider.vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const instance = getCurrentInstance();
const $t = instance.appContext.config.globalProperties.$t;

const { currentLanguage, currentUITheme } = useSettings();
const { currentZoom } = useUIState();

function setTheme(v: string) {
  theme.global.name.value = v;
}
</script>

<template>
  <LanguageSelector v-model="currentLanguage" />
  <ThemeSelector v-model="currentUITheme" @update="setTheme" />

  <div>
    <div class="text-caption ma-1">{{ $t("changeZoom") }}</div>
    <ZoomSlider :current-zoom="currentZoom" @zoom="currentZoom = $event" />
  </div>
</template>
