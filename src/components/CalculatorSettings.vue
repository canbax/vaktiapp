<script setup lang="ts">
import { useSettings } from '@/composables/settings';
import CalculatorMadhabSelector from '@/components/CalculatorMadhabSelector.vue';
import CalculatorMethodSelector from '@/components/CalculatorMethodSelector.vue';
import { getCountryList } from '@/util/countryData';

const { calculatorMethod, calculatorMadhab, currentCountry, currentLanguage } = useSettings();

const countries = getCountryList(currentLanguage.value.languageCode);
</script>

<template>
  <CalculatorMethodSelector v-model="calculatorMethod" />
  <CalculatorMadhabSelector v-model="calculatorMadhab" />

  <v-autocomplete
    v-model="currentCountry"
    :items="countries"
    item-title="name"
    item-value="code"
    :label="$t('selectCountry')"
    :placeholder="$t('selectCountry')"
  />
</template>
