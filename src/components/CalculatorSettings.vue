<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const $t = instance.appContext.config.globalProperties.$t;

const { calculatorMethod, calculatorMadhab } = useSettings();
const allMethods = [
  "MuslimWorldLeague",
  "Egyptian",
  "Karachi",
  "UmmAlQura",
  "Dubai",
  "MoonsightingCommittee",
  "NorthAmerica",
  "Kuwait",
  "Qatar",
  "Singapore",
  "Tehran",
  "Turkey",
  "Other",
];
const madhabs = ["shafi", "hanafi"];
</script>

<template>
  <v-autocomplete
    v-model="calculatorMethod"
    autocomplete="new-password"
    :items="allMethods"
    :label="$t('calculatorMethod')"
    :placeholder="$t('calculatorMethod')"
  />
  <v-select
    v-model="calculatorMadhab"
    :items="madhabs"
    :label="$t('calculatorMadhab')"
    :placeholder="$t('calculatorMadhab')"
  />
</template>
