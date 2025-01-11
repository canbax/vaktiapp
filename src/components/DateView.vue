<script setup lang="ts">
import type { DateStringFormat } from '@/types';
import { HijriDate } from '@/util/HijriDate';
import { dateToString } from '@/util/dateAndTime';
import { getTranslateFn } from '@/util/i18n';
import { computed, getCurrentInstance } from 'vue';

const $t = getTranslateFn(getCurrentInstance());

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
  <div class="text-h5 text-center ma-4">
    <div data-testid="date-str" class="mb-2">{{ dateString }}</div>

    <div v-if="isShowHijriDate" class="font-weight-light text-h6" data-testid="hijri-date-str">
      {{ hijriDateString }}
    </div>
  </div>
</template>

<style scoped></style>
