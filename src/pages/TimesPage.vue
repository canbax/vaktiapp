<script setup lang="ts">
import DailyPrayTimes from "@/components/DailyPrayTimes.vue";
import DateView from "@/components/DateView.vue";
import { DateStringFormat, HourString, RemainingTimeFormat } from "@/types";

let currTimes: HourString[] = [
  "05:42",
  "07:07",
  "12:37",
  "15:29",
  "17:58",
  "19:16",
];

let remainTimeFmt: RemainingTimeFormat = "X hour Y minute Z second";
let date = new Date();
let dateStringFormat: DateStringFormat = {
  month: "MM",
  weekDay: "-",
  year: "YYYY",
};
</script>

<template>
  <DateView
    :date="date"
    :date-string-format="dateStringFormat"
    :is-show-hijri-date="true"
  ></DateView>
  <v-divider></v-divider>
  <DailyPrayTimes
    :is-showing-today="true"
    :curr-times="currTimes"
    :remaining-time-format="remainTimeFmt"
  ></DailyPrayTimes>
</template>

<style scoped></style>
