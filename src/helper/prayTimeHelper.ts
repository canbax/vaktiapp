import { HourString } from "@/types";
import {
  ONE_DAY_IN_SECONDS,
  getTotalSeconds,
  hourStringToTotalSeconds,
} from "@/util/dateAndTime";

/** assumes `prayTimes` are in ascending order */
function findCurrPrayIndex(now: Date, prayTimes: HourString[]): number {
  const currTime = getTotalSeconds(now);

  for (let i = 0; i < prayTimes.length; i++) {
    const prayTime = hourStringToTotalSeconds(prayTimes[i]);
    if (currTime < prayTime) return i;
  }
  return 0;
}

export function findRemainingSecondsToCurrPray(
  now: Date,
  prayTimes: HourString[]
): { remainedSeconds: number; currPray: number } {
  if (prayTimes.length < 1) return { remainedSeconds: 0, currPray: 0 };
  const currPray = findCurrPrayIndex(now, prayTimes);
  const currPrayInSeconds = hourStringToTotalSeconds(prayTimes[currPray]);
  const nowInSeconds = getTotalSeconds(now);
  let remainedSeconds = currPrayInSeconds - nowInSeconds;
  // measure time difference for the next day
  if (remainedSeconds < 0 && currPray === 0) {
    remainedSeconds = ONE_DAY_IN_SECONDS - nowInSeconds + currPrayInSeconds;
  } else if (remainedSeconds < 0 && currPray > 0) {
    const errMsg = `negative remained seconds for non-first pray time with time ${now} and pray times ${prayTimes} and currPray ${currPray}`;
    throw new Error(errMsg);
  }

  return { remainedSeconds, currPray };
}
