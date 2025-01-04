<script setup lang="ts">
import type { CalculatorMadhab } from '@/types';
import { getTranslateFn } from '@/util/i18n';
import { getCurrentInstance } from 'vue';

const $t = getTranslateFn(getCurrentInstance());

const madhabs = ['shafi', 'hanafi'];

const model = defineModel<CalculatorMadhab>();
</script>

<template>
  <v-select
    v-model="model"
    :items="madhabs"
    :label="$t('calculatorMadhab')"
    :placeholder="$t('calculatorMadhab')"
  />
</template>
