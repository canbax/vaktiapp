<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { useUIState } from "@/composables/userInterfaceState";
import { DateStringFormat, RemainingTimeFormat } from "@/types";
import { computed, getCurrentInstance, ref } from "vue";
import { dateToString, secondsToHumanReadable } from "@/util/dateAndTime";

const instance = getCurrentInstance();
const $t = instance.appContext.config.globalProperties.$t;

const {
  currentTimeFormat,
  currYearFormat,
  currMonthFormat,
  currWeekdayFormat,
} = useSettings();
const { isShowHijriDate } = useUIState();

const isGlowSampleRemainingTime = ref(false);
const isGlowSampleDate = ref(false);

type TimeFormatOption = { title: string; value: RemainingTimeFormat };

const TIME_FORMATS: TimeFormatOption[] = [
  { title: "XX:YY:ZZ", value: "XX:YY:ZZ" },
  { title: "XX:YY", value: "XX:YY" },
  {
    title: `X ${$t("hour")} Y ${$t("minute")} Z ${$t("second")}`,
    value: `X hour Y minute Z second`,
  },
  {
    title: `X ${$t("hour")} Y ${$t("minute")}`,
    value: `X hour Y minute`,
  },
];

const yearFormats: DateStringFormat["year"][] = ["YYYY", "YY", "-"];
const monthFormats: DateStringFormat["month"][] = ["MMMM", "MMM", "MM"];
const weekdayFormats: DateStringFormat["weekDay"][] = ["DDDD", "DDD", "-"];

const sampleDate = computed<string>(() => {
  return dateToString(
    new Date(),
    {
      year: currYearFormat.value,
      month: currMonthFormat.value,
      weekDay: currWeekdayFormat.value,
    },
    $t
  );
});

const sampleRemainingTime = computed<string>(() => {
  return secondsToHumanReadable(
    3919,
    $t("hour"),
    $t("minute"),
    $t("second"),
    currentTimeFormat.value
  );
});

const ANIM_TIMEOUT = 3000;

function glowSampleRemainingTime() {
  isGlowSampleRemainingTime.value = true;
  setTimeout(() => (isGlowSampleRemainingTime.value = false), ANIM_TIMEOUT);
}

function glowSampleDate() {
  isGlowSampleDate.value = true;
  setTimeout(() => (isGlowSampleDate.value = false), ANIM_TIMEOUT);
}
</script>

<template>
  <v-checkbox v-model="isShowHijriDate" :label="$t('isShowHijriDate')" />

  <v-sheet rounded elevation="2" class="m5 p5">
    <span>{{ $t("dateFormat") }}</span>
    <div class="m5">
      <v-row align="center">
        <v-col class="d-flex" cols="4">
          <v-select
            v-model="currYearFormat"
            :items="yearFormats"
            :label="$t('yearFormat')"
            :placeholder="$t('yearFormat')"
            @update:modelValue="glowSampleDate"
          />
        </v-col>
        <v-col class="d-flex" cols="4">
          <v-select
            v-model="currMonthFormat"
            :items="monthFormats"
            :label="$t('monthFormat')"
            :placeholder="$t('monthFormat')"
            @update:modelValue="glowSampleDate"
          />
        </v-col>
        <v-col class="d-flex" cols="4">
          <v-select
            v-model="currWeekdayFormat"
            :items="weekdayFormats"
            :label="$t('weekdayFormat')"
            :placeholder="$t('weekdayFormat')"
            @update:modelValue="glowSampleDate"
          />
        </v-col>
      </v-row>
      <h3 class="text-center" :class="{ glow: isGlowSampleDate }">
        {{ sampleDate }}
      </h3>
    </div>
  </v-sheet>
  <!-- remaining time format -->
  <v-sheet rounded elevation="2" class="m5 p5">
    <span>{{ $t("remainingTimeFormat") }}</span>
    <v-select
      v-model="currentTimeFormat"
      :items="TIME_FORMATS"
      :label="$t('remainingTimeFormat')"
      :placeholder="$t('remainingTimeFormat')"
      @update:modelValue="glowSampleRemainingTime"
    />
    <h3 class="text-center" :class="{ glow: isGlowSampleRemainingTime }">
      {{ sampleRemainingTime }}
    </h3>
  </v-sheet>
</template>

<style scoped>
@keyframes glow {
  0% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  50% {
    text-shadow: 0 0 15px rgba(255, 255, 255, 1);
  }
  100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
}

.glow {
  animation: glow 2s ease-in-out;
}
</style>
