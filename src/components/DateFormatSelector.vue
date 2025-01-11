<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';
import type { DateStringFormat } from '@/types';
import { dateToString } from '@/util/dateAndTime';
import { triggerClick } from '@/util/event';
import { getTranslateFn } from '@/util/i18n';

const $t = getTranslateFn(getCurrentInstance());

const year = defineModel<DateStringFormat['year']>('year');
const month = defineModel<DateStringFormat['month']>('month');
const weekDay = defineModel<DateStringFormat['weekDay']>('weekDay');

const rippleText = ref(null);

const yearFormats: DateStringFormat['year'][] = ['YYYY', 'YY', '-'];
const monthFormats: DateStringFormat['month'][] = ['MMMM', 'MMM', 'MM'];
const weekdayFormats: DateStringFormat['weekDay'][] = ['DDDD', 'DDD', '-'];

const sampleDate = computed<string>(() => {
  return dateToString(
    new Date(),
    {
      year: year.value ?? '-',
      month: month.value ?? 'MM',
      weekDay: weekDay.value ?? '-',
    },
    $t,
  );
});

function glowSampleDate() {
  triggerClick(rippleText);
}
</script>

<template>
  <v-form>
    <div class="ma-1">
      <div class="pa-1">{{ $t('dateFormat') }}</div>
      <v-row align="center">
        <v-col cols="12" sm="4">
          <v-select
            v-model="year"
            :items="yearFormats"
            :label="$t('yearFormat')"
            :placeholder="$t('yearFormat')"
            @update:modelValue="glowSampleDate"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="month"
            :items="monthFormats"
            :label="$t('monthFormat')"
            :placeholder="$t('monthFormat')"
            @update:modelValue="glowSampleDate"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="weekDay"
            :items="weekdayFormats"
            :label="$t('weekdayFormat')"
            :placeholder="$t('weekdayFormat')"
            @update:modelValue="glowSampleDate"
          />
        </v-col>
      </v-row>
      <h3 ref="rippleText" class="text-center" v-ripple.center="{ class: 'text-primary' }">
        {{ sampleDate }}
      </h3>
    </div>
  </v-form>
</template>
