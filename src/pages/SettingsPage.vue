<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { UserInterfaceLanguage } from "@/types";
const { currentLanguage } = useSettings();

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
  </v-container>
</template>

<style scoped></style>
