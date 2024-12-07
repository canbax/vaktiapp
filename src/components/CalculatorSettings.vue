<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import CalculatorMadhabSelector from "@/components/CalculatorMadhabSelector.vue";
import CalculatorMethodSelector from "@/components/CalculatorMethodSelector.vue";

const { calculatorMethod, calculatorMadhab } = useSettings();
</script>

<template>
  <CalculatorMethodSelector v-model="calculatorMethod" />
  <CalculatorMadhabSelector v-model="calculatorMadhab" />
</template>
