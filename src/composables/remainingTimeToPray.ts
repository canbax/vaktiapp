import { findRemainingSecondsToCurrPray } from "@/helper/prayTimeHelper";
import { HourString, RemainingTimeFormat, RemainingToPray } from "@/types";
import { secondsToHumanReadable } from "@/util/dateAndTime";
import { ref, getCurrentInstance, Ref, toValue, watchEffect } from "vue";
import { usePeriodicExecution } from "./periodicExecution";

export function useRemainingTimeToPray(
  currTimes: Ref<HourString[]>,
  remainingTimeFormat: Ref<RemainingTimeFormat>
): RemainingToPray {
  const currPrayIdx = ref(2);
  const remainingTime = ref("");

  const instance = getCurrentInstance();
  const $t = instance.appContext.config.globalProperties.$t;

  function update() {
    watchEffect(() => {
      const { remainedSeconds, currPray } = findRemainingSecondsToCurrPray(
        new Date(),
        toValue(currTimes)
      );

      currPrayIdx.value = currPray;
      remainingTime.value = secondsToHumanReadable(
        remainedSeconds,
        $t("hour"),
        $t("minute"),
        $t("second"),
        toValue(remainingTimeFormat)
      );
    });
  }

  usePeriodicExecution(update, 1000);

  return { currPrayIdx, remainingTime };
}
