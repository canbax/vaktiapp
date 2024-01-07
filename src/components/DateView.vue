<script setup lang="ts">
import { DateStringFormat } from "@/types";
import { HijriDate } from "@/util/HijriDate";
import { dateToString } from "@/util/dateAndTime";
import { computed, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const $t = instance.appContext.config.globalProperties.$t;

const props = defineProps<{
  date: Date;
  isShowHijriDate: boolean;
  dateStringFormat: DateStringFormat;
}>();

const dateString = computed(() => {
  return dateToString(props.date, props.dateStringFormat, $t);
});

const hijriDateString = computed(() => {
  return new HijriDate().toHijri(props.date).toStr($t);
});
</script>

<template>
  <div class="text-h4 text-center">{{ dateString }}</div>
  <div v-if="isShowHijriDate" class="text-center text-subtitle-1">
    {{ hijriDateString }}
  </div>
</template>

<style scoped></style>
