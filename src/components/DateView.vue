<script setup lang="ts">
import { DateStringFormat } from "@/types";
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
</script>

<template>
  <div>{{ dateString }}</div>
  <div v-if="isShowHijriDate"><small></small></div>
</template>

<style scoped></style>
