<script setup lang="ts">
import { getTimes } from '@/TimeCalculator';
import DailyPrayTimes from '@/components/DailyPrayTimes.vue';
import DateView from '@/components/DateView.vue';
import type {
  AppTheme,
  CalculatorMadhab,
  DateStringFormat,
  GenericPlace,
  HourString,
  RemainingTimeFormat,
} from '@/types';
import { computed } from 'vue';
import { dateToStandardString, isToday } from '@/util/dateAndTime';
import { CalculationMethod } from 'adhan';

export interface TimesViewProps {
  currentPlace: GenericPlace | null;
  currentTimeFormat: RemainingTimeFormat;
  currYearFormat: DateStringFormat['year'];
  currMonthFormat: DateStringFormat['month'];
  currWeekdayFormat: DateStringFormat['weekDay'];
  currDate: Date;
  calculatorMethod: keyof typeof CalculationMethod;
  calculatorMadhab: CalculatorMadhab;
  isShowHijriDate: boolean;
  theme: AppTheme;
}

const props = defineProps<TimesViewProps>();

const emit = defineEmits<{
  (e: 'showToday'): void;
  (e: 'nextDay'): void;
  (e: 'prevDay'): void;
}>();

const currTimes = computed<HourString[]>(() => {
  if (!props.currentPlace?.latitude || !props.currentPlace?.longitude) return [];
  const times = getTimes(
    props.currentPlace.latitude,
    props.currentPlace.longitude,
    props.currDate,
    1,
    props.calculatorMethod,
    props.calculatorMadhab,
  );
  const dateStr = dateToStandardString(props.currDate);
  return times[dateStr];
});

const dateStringFormat = computed<DateStringFormat>(() => {
  return {
    month: props.currMonthFormat,
    weekDay: props.currWeekdayFormat,
    year: props.currYearFormat,
  };
});

const isShowingToday = computed<boolean>(() => isToday(props.currDate));
</script>

<template>
  <v-theme-provider :theme="theme" with-background class="ma-2">
    <DateView
      :date="currDate"
      :date-string-format="dateStringFormat"
      :is-show-hijri-date="isShowHijriDate"
    />
    <v-divider class="ma-4" />
    <DailyPrayTimes
      :is-showing-today="isShowingToday"
      :curr-times="currTimes"
      :remaining-time-format="currentTimeFormat"
      @prev-day="emit('prevDay')"
      @show-today="emit('showToday')"
      @next-day="emit('nextDay')"
    />
  </v-theme-provider>
</template>
