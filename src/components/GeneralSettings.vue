<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { useUIState } from "@/composables/userInterfaceState";
import { ALL_LANGUAGES } from "@/util/i18n";
import { getCurrentInstance } from "vue";
import ZoomSlider from "@/components/ZoomSlider.vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const instance = getCurrentInstance();
const $t = instance.appContext.config.globalProperties.$t;

const { currentLanguage, currentUITheme } = useSettings();
const { currentZoom } = useUIState();

const themes: { title: string; value: string }[] = [
  { title: $t("light"), value: "light" },
  { title: $t("dark"), value: "dark" },
];

function setTheme(v: string) {
  theme.global.name.value = v;
}
</script>

<template>
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
    <div class="text-caption ma-1">{{ $t("changeZoom") }}</div>
    <ZoomSlider :current-zoom="currentZoom" @zoom="currentZoom = $event" />
  </div>
</template>
