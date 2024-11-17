<script setup lang="ts">
import { getTimes } from "@/TimeCalculator";
import DailyPrayTimes from "@/components/DailyPrayTimes.vue";
import DateView from "@/components/DateView.vue";
import { DateStringFormat, HourString } from "@/types";
import { useSettings } from "@/composables/settings";
import { computed, ref } from "vue";
import { dateToStandardString } from "@/util/dateAndTime";
import { useUIState } from "@/composables/userInterfaceState";

const {
  currentPlace,
  currentTimeFormat,
  currYearFormat,
  currMonthFormat,
  currWeekdayFormat,
} = useSettings();
const { isShowHijriDate } = useUIState();

const currDate = ref<Date>(new Date());

const currTimes = computed<HourString[]>(() => {
  if (!currentPlace.value?.latitude || !currentPlace.value?.longitude)
    return [];
  const times = getTimes(
    currentPlace.value.latitude,
    currentPlace.value.longitude,
    currDate.value,
    1
  );
  const dateStr = dateToStandardString(currDate.value);
  return times[dateStr];
});

const dateStringFormat = computed<DateStringFormat>(() => {
  return {
    month: currMonthFormat.value,
    weekDay: currWeekdayFormat.value,
    year: currYearFormat.value,
  };
});

function goToToday() {
  currDate.value = new Date();
}

function goToYesterday() {
  const d = new Date(currDate.value);
  d.setDate(currDate.value.getDate() - 1);
  currDate.value = d;
}

function goToTomorrow() {
  const d = new Date(currDate.value);
  d.setDate(currDate.value.getDate() + 1);
  currDate.value = d;
}

const isShowingToday = computed<boolean>(
  () =>
    dateToStandardString(new Date()) === dateToStandardString(currDate.value)
);
</script>

<template>
  <DateView
    :date="currDate"
    :date-string-format="dateStringFormat"
    :is-show-hijri-date="isShowHijriDate"
  ></DateView>
  <v-divider></v-divider>
  <DailyPrayTimes
    :is-showing-today="isShowingToday"
    :curr-times="currTimes"
    :remaining-time-format="currentTimeFormat"
    @prev-day="goToYesterday"
    @show-today="goToToday"
    @next-day="goToTomorrow"
  ></DailyPrayTimes>
</template>
