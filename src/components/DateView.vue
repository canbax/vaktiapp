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
  <div class="text-h6 text-center">
    <span data-testid="date-str"> {{ dateString }} </span>

    <span v-if="isShowHijriDate" data-testid="hijri-date-str">
      - {{ hijriDateString }}
    </span>
  </div>
</template>

<style scoped></style>
