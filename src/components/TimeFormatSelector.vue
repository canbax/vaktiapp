<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue";
import { RemainingTimeFormat } from "@/types";
import { secondsToHumanReadable } from "@/util/dateAndTime";
import { triggerClick } from "@/util/event";

const instance = getCurrentInstance();
const $t = instance?.appContext.config.globalProperties.$t;

const model = defineModel<RemainingTimeFormat>();
const rippleText = ref(null);

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

const sampleRemainingTime = computed<string>(() => {
  return secondsToHumanReadable(
    3919,
    $t("hour"),
    $t("minute"),
    $t("second"),
    model.value
  );
});

function glowSampleRemainingTime() {
  triggerClick(rippleText);
}
</script>

<template>
  <v-form>
    <v-select
      v-model="model"
      :items="TIME_FORMATS"
      :label="$t('remainingTimeFormat')"
      :placeholder="$t('remainingTimeFormat')"
      @update:modelValue="glowSampleRemainingTime"
    />
    <h3
      ref="rippleText"
      class="text-center"
      v-ripple.center="{ class: 'text-primary' }"
    >
      {{ sampleRemainingTime }}
    </h3>
  </v-form>
</template>
