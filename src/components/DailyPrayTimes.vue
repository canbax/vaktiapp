<script setup lang="ts">
import { HourString, RemainingTimeFormat } from "@/types";
import { useRemainingTimeToPray } from "@/composables/remainingTimeToPray";
import { computed, toRef } from "vue";

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

const prayableIndex = computed<number>(() => {
  if (currPrayIdx.value === 0) return 5;
  return currPrayIdx.value - 1;
});

function prayableRowCSS(i: number, padding = false) {
  if (padding) {
    return [
      { "font-weight-bold text-orange": i === prayableIndex.value },
      "text-h5",
      "ps-2",
    ];
  }
  return [
    { "font-weight-bold text-orange": i === prayableIndex.value },
    "text-h5",
  ];
}
</script>

<template>
  <div class="text-center">
    <div class="d-flex justify-center">
      <v-btn
        @click="emit('prevDay')"
        v-tooltip:start="$t('prevDay')"
        data-testid="prev-btn"
        icon="mdi-calendar-arrow-left"
        class="my-auto mx-2"
      />

      <div class="d-flex flex-column">
        <div v-for="(item, i) in currTimes" :key="i" data-testid="time-row">
          <div class="d-flex justify-end w-100">
            <span :class="prayableRowCSS(i)">
              {{ $t(timeItems[i]) }}
            </span>
            <span :class="prayableRowCSS(i, true)">
              {{ item }}
            </span>
          </div>
        </div>
      </div>

      <v-btn
        @click="emit('nextDay')"
        data-testid="next-btn"
        v-tooltip:end="$t('nextDay')"
        icon="mdi-calendar-arrow-right"
        class="my-auto mx-2"
      />
    </div>

    <v-divider></v-divider>
    <div v-if="isShowingToday">
      <span> {{ $t(timeItems[currPrayIdx]) }} {{ $t("remainingTime") }} </span>
      <h2 data-testid="remaining-time">{{ remainingTime }}</h2>
    </div>
    <div v-else>
      <v-btn
        @click="emit('showToday')"
        data-testid="today-btn"
        v-tooltip:bottom="$t('today')"
        icon="mdi-calendar-today"
        color="primary"
        class="my-2"
      />
    </div>
  </div>
</template>

<style scoped></style>
