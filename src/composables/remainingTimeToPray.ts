import { findRemainingSecondsToCurrPray } from '@/helper/prayTimeHelper';
import type { HourString, RemainingTimeFormat, RemainingToPray } from '@/types';
import { secondsToHumanReadable } from '@/util/dateAndTime';
import { ref, getCurrentInstance, toValue, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { usePeriodicExecution } from './periodicExecution';
import { getTranslateFn } from '@/util/i18n';

export function useRemainingTimeToPray(
  currTimes: Ref<HourString[]>,
  remainingTimeFormat: Ref<RemainingTimeFormat>,
): RemainingToPray {
  const currPrayIdx = ref(2);
  const remainingTime = ref('');

  const $t = getTranslateFn(getCurrentInstance());

  function update() {
    watchEffect(() => {
      const { remainedSeconds, currPray } = findRemainingSecondsToCurrPray(
        new Date(),
        toValue(currTimes),
      );

      currPrayIdx.value = currPray;
      remainingTime.value = secondsToHumanReadable(
        remainedSeconds,
        $t('hour'),
        $t('minute'),
        $t('second'),
        toValue(remainingTimeFormat),
      );
    });
  }

  update();
  usePeriodicExecution(update, 1000);

  return { currPrayIdx, remainingTime };
}
