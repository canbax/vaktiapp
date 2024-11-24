<script setup lang="ts">
import { HourString, RemainingTimeFormat } from "@/types";
import { useRemainingTimeToPray } from "@/composables/remainingTimeToPray";
import { toRef } from "vue";

const props = defineProps<{
  currTimes: HourString[];
  isShowingToday: boolean;
  remainingTimeFormat: RemainingTimeFormat;
}>();

const emit = defineEmits<{
  (e: "showToday"): void;
  (e: "nextDay"): void;
  (e: "prevDay"): void;
}>();

const timeItems = Array(6)
  .fill(``)
  .map((_, i) => `timeItem${i}`);

const { currPrayIdx, remainingTime } = useRemainingTimeToPray(
  toRef(() => props.currTimes),
  toRef(() => props.remainingTimeFormat)
);
</script>

<template>
  <div class="text-center">
    <div class="d-flex justify-center">
      <v-btn
        @click="emit('prevDay')"
        v-tooltip:start="$t('prevDay')"
        icon="mdi-calendar-arrow-left"
        class="my-auto mx-2"
      />

      <div class="d-flex flex-column">
        <div
          class="d-flex justify-center"
          v-for="(item, i) in currTimes"
          :key="i"
        >
          <span class="text-right pe-2">
            <span
              :class="[{ 'font-weight-bold': i === currPrayIdx }, 'text-h5']"
            >
              {{ $t(timeItems[i]) }}
            </span>
          </span>
          <span class="text-left ps-2">
            <span
              :class="[{ 'font-weight-bold': i === currPrayIdx }, 'text-h5']"
            >
              {{ item }}
              <v-icon v-if="i == currPrayIdx"> mdi-clock </v-icon>
            </span>
          </span>
        </div>
      </div>

      <v-btn
        @click="emit('nextDay')"
        v-tooltip:end="$t('nextDay')"
        icon="mdi-calendar-arrow-right"
        class="my-auto mx-2"
      />
    </div>

    <v-divider></v-divider>
    <div v-if="isShowingToday">
      <span> {{ $t(timeItems[currPrayIdx]) }} {{ $t("remainingTime") }} </span>
      <h2 test-id="remaining-time">{{ remainingTime }}</h2>
    </div>
    <div v-else>
      <v-btn
        @click="emit('showToday')"
        v-tooltip:bottom="$t('today')"
        icon="mdi-calendar-today"
        color="primary"
        class="my-2"
      />
    </div>
  </div>
</template>

<style scoped></style>
