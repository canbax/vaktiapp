<script setup lang="ts">
import { CalculationMethod } from 'adhan';
import { getCurrentInstance } from 'vue';
import { getTranslateFn } from '@/util/i18n';

const $t = getTranslateFn(getCurrentInstance());

const allMethods = [
  'MuslimWorldLeague',
  'Egyptian',
  'Karachi',
  'UmmAlQura',
  'Dubai',
  'MoonsightingCommittee',
  'NorthAmerica',
  'Kuwait',
  'Qatar',
  'Singapore',
  'Tehran',
  'Turkey',
  'Other',
];

const model = defineModel<keyof typeof CalculationMethod>();
</script>

<template>
  <v-autocomplete
    v-model="model"
    autocomplete="new-password"
    :items="allMethods"
    :label="$t('calculatorMethod')"
    :placeholder="$t('calculatorMethod')"
  />
</template>
