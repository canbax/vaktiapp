<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { useUIState } from "@/composables/userInterfaceState";
import DateAndTimeSettings from "@/components/DateAndTimeSettings.vue";
import { UserInterfaceLanguage } from "@/types";
import { computed, getCurrentInstance, ref } from "vue";
import { useTheme } from "vuetify";
import { useDebounceFn } from "@vueuse/core";

const theme = useTheme();

const instance = getCurrentInstance();
const $t = instance.appContext.config.globalProperties.$t;
const MAX_ZOOM = 2;
const MIN_ZOOM = 0.5;
const ZOOM_STEP = 0.1;

const { currentLanguage, currentUITheme } = useSettings();
const { currentZoom } = useUIState();
const instantZoom = ref(currentZoom.value);

const ALL_LANGUAGES: UserInterfaceLanguage[] = [
  { text: "Türkçe", languageCode: "tr" },
  { text: "English", languageCode: "en" },
  { text: "Pусский", languageCode: "ru" },
  { text: "Española", languageCode: "es" },
  { text: "فارسی", languageCode: "fa" },
  { text: "Français", languageCode: "fr" },
  { text: "Deutsch", languageCode: "de" },
  { text: "Chinese", languageCode: "zh" },
  { text: "عربى", languageCode: "ar" },
  { text: "Indonesia", languageCode: "id" },
  { text: "Italian", languageCode: "it" },
  { text: "Kazakh", languageCode: "kk" },
  { text: "Korean", languageCode: "ko" },
  { text: "Kyrgyz", languageCode: "ky" },
  { text: "Malay", languageCode: "ms" },
];

type Option = { title: string; value: string };

const themes: Option[] = [
  { title: $t("light"), value: "light" },
  { title: $t("dark"), value: "dark" },
];

function setTheme(v: string) {
  theme.global.name.value = v;
}

function limitInstantZoomInRange() {
  if (instantZoom.value > MAX_ZOOM) instantZoom.value = MAX_ZOOM;
  if (instantZoom.value < MIN_ZOOM) instantZoom.value = MIN_ZOOM;
}

const debouncedSetZoom = useDebounceFn(() => {
  limitInstantZoomInRange();
  currentZoom.value = instantZoom.value;
}, 500);

const zoomPercentage = computed<string>(() => {
  const normalizedZoom = Math.round(currentZoom.value * 100) + "";
  if (currentLanguage.value && currentLanguage.value?.languageCode == "tr")
    return "(%" + normalizedZoom + ")";
  return "(" + normalizedZoom + "%)";
});

function zoomIn() {
  instantZoom.value = instantZoom.value + ZOOM_STEP;
  debouncedSetZoom();
}

function zoomOut() {
  instantZoom.value = instantZoom.value - ZOOM_STEP;
  debouncedSetZoom();
}
</script>

<template>
  <v-container fluid>
    <v-autocomplete
      v-model="currentLanguage"
      autocomplete="new-password"
      :items="ALL_LANGUAGES"
      item-title="text"
      :label="$t('selectLanguage')"
      :placeholder="$t('selectLanguage')"
      return-object
    />
    <v-select
      v-model="currentUITheme"
      :items="themes"
      :label="$t('selectTheme')"
      :placeholder="$t('selectTheme')"
      @update:model-value="setTheme"
    />

    <div>
      <div class="text-caption">{{ $t("changeZoom") }}</div>
      <v-slider
        v-model="instantZoom"
        :hint="zoomPercentage"
        :persistent-hint="true"
        :max="MAX_ZOOM"
        :min="MIN_ZOOM"
        :step="ZOOM_STEP"
        show-ticks="always"
        class="align-center"
        thumb-label="always"
        @end="debouncedSetZoom"
      >
        <template #prepend>
          <v-btn @click="zoomOut()" size="small" icon="mdi-magnify-minus" />
        </template>
        <template #append>
          <v-btn @click="zoomIn()" size="small" icon="mdi-magnify-plus" />
        </template>
      </v-slider>
    </div>

    <DateAndTimeSettings />
  </v-container>
</template>

<style scoped></style>
