<script setup lang="ts">
import { CalculatorMadhab } from "@/types";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const $t = instance.appContext.config.globalProperties.$t;

const madhabs = ["shafi", "hanafi"];

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
