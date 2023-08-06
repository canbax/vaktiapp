import { findRemainingSecondsToCurrPray } from "@/helper/prayTimeHelper";
import { HourString, RemainingTimeFormat } from "@/types";
import { secondsToHumanReadable } from "@/util/dateAndTime";
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";

export function useRemainingTimeToPray(
  currTimes: HourString[],
  remainingTimeFormat: RemainingTimeFormat
) {
  const currPrayIdx = ref(2);
  const remainingTime = ref("");

  const instance = getCurrentInstance();
  const $t = instance.appContext.config.globalProperties.$t;

  function update() {
    const { remainedSeconds, currPray } = findRemainingSecondsToCurrPray(
      new Date(),
      currTimes
    );

    currPrayIdx.value = currPray;
    remainingTime.value = secondsToHumanReadable(
      remainedSeconds,
      $t("hour"),
      $t("minute"),
      $t("second"),
      remainingTimeFormat
    );
  }

  let intervalId: number | NodeJS.Timer;
  onMounted(() => {
    intervalId = setInterval(update, 1000);
  });
  onUnmounted(() => {
    window.clearInterval(intervalId);
  });

  return { currPrayIdx, remainingTime };
}
