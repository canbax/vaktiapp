<script setup lang="ts">
import { useSettings } from '@/composables/settings';
import { useUIState } from '@/composables/userInterfaceState';
import { getCurrentInstance } from 'vue';
import DateFormatSelector from '@/components/DateFormatSelector.vue';
import TimeFormatSelector from '@/components/TimeFormatSelector.vue';
import { getTranslateFn } from '@/util/i18n';

const $t = getTranslateFn(getCurrentInstance());

const { currentTimeFormat, currYearFormat, currMonthFormat, currWeekdayFormat } = useSettings();
const { isShowHijriDate } = useUIState();
</script>

<template>
  <v-checkbox v-model="isShowHijriDate" :label="$t('isShowHijriDate')" />

  <DateFormatSelector
    v-model:year="currYearFormat"
    v-model:month="currMonthFormat"
    v-model:weekDay="currWeekdayFormat"
  />
  <TimeFormatSelector v-model="currentTimeFormat" />
</template>
