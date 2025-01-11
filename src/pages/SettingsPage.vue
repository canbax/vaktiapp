<script setup lang="ts">
import DateAndTimeSettings from '@/components/DateAndTimeSettings.vue';
import { getCurrentInstance } from 'vue';
import GeneralSettings from '@/components/GeneralSettings.vue';
import CalculatorSettings from '@/components/CalculatorSettings.vue';
import { useUIState } from '@/composables/userInterfaceState';
import { getTranslateFn } from '@/util/i18n';
import { useScrollTop } from '@/composables/scrollTop';

useScrollTop();
const { settingsTab } = useUIState();

const $t = getTranslateFn(getCurrentInstance());
</script>

<template>
  <div class="d-flex flex-row ma-1">
    <v-tabs v-model="settingsTab" color="primary" direction="vertical">
      <v-tab :text="$t('system')" prepend-icon="mdi-cog" value="1"></v-tab>
      <v-tab :text="$t('dateAndTime')" prepend-icon="mdi-calendar-clock" value="2"></v-tab>
      <v-tab :text="$t('calculator')" prepend-icon="mdi-calculator-variant" value="3"></v-tab>
    </v-tabs>

    <v-tabs-window v-model="settingsTab" class="ma-1 flex-grow-1">
      <v-tabs-window-item value="1">
        <GeneralSettings />
      </v-tabs-window-item>
      <v-tabs-window-item value="2">
        <DateAndTimeSettings />
      </v-tabs-window-item>
      <v-tabs-window-item value="3">
        <CalculatorSettings />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<style scoped></style>
