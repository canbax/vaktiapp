<script setup lang="ts">
import TimesView from '@/components/TimesView.vue';
import { useSettings } from '@/composables/settings';
import { ref } from 'vue';
import { dateToStandardString } from '@/util/dateAndTime';
import { useUIState } from '@/composables/userInterfaceState';
import { useScrollTop } from '@/composables/scrollTop';

useScrollTop();
const {
  currentPlace,
  currentTimeFormat,
  currYearFormat,
  currMonthFormat,
  currWeekdayFormat,
  currentDate,
  persistCurrentDate,
  calculatorMethod,
  calculatorMadhab,
  currentUITheme,
} = useSettings();
const { isShowHijriDate } = useUIState();

const currDate = ref<Date>(
  persistCurrentDate.value && currentDate.value ? new Date(currentDate.value) : new Date(),
);

function syncCurrentDate() {
  currentDate.value = dateToStandardString(currDate.value);
}

function goToToday() {
  currDate.value = new Date();
  currentDate.value = null;
}

function goToYesterday() {
  const d = new Date(currDate.value);
  d.setDate(currDate.value.getDate() - 1);
  currDate.value = d;
  syncCurrentDate();
}

function goToTomorrow() {
  const d = new Date(currDate.value);
  d.setDate(currDate.value.getDate() + 1);
  currDate.value = d;
  syncCurrentDate();
}
</script>

<template>
  <TimesView
    :theme="currentUITheme"
    :currentPlace="currentPlace"
    :currentTimeFormat="currentTimeFormat"
    :currYearFormat="currYearFormat"
    :currMonthFormat="currMonthFormat"
    :currWeekdayFormat="currWeekdayFormat"
    :currDate="currDate"
    :calculatorMethod="calculatorMethod"
    :calculatorMadhab="calculatorMadhab"
    :isShowHijriDate="isShowHijriDate"
    @prev-day="goToYesterday"
    @show-today="goToToday"
    @next-day="goToTomorrow"
  />
</template>
