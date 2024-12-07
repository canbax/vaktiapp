<script setup lang="ts">
import TimesView from "@/components/TimesView.vue";
import { ref } from "vue";
import { useUrlParams } from "@/composables/urlParams";

const {
  calculatorMadhab,
  calculatorMethod,
  currentPlace,
  currentTimeFormat,
  currMonthFormat,
  currWeekdayFormat,
  currYearFormat,
  isShowHijriDate,
  currDate,
  theme,
} = useUrlParams();

const currentDate = ref<Date>(
  currDate.value ? new Date(currDate.value) : new Date()
);

function goToToday() {
  currentDate.value = new Date();
}

function goToYesterday() {
  const d = new Date(currDate.value);
  d.setDate(currDate.value.getDate() - 1);
  currentDate.value = d;
}

function goToTomorrow() {
  const d = new Date(currDate.value);
  d.setDate(currDate.value.getDate() + 1);
  currentDate.value = d;
}
</script>

<template>
  <TimesView
    v-if="currentPlace"
    :currentPlace="currentPlace"
    :theme="theme"
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
