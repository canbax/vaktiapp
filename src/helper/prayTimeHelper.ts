import { HourString } from "@/types";
import { getTotalSeconds, hourStringToTotalSeconds } from "@/util/dateAndTime";

/** assumes `prayTimes` are in ascending order */
export function findCurrPrayIndex(now: Date, prayTimes: HourString[]): number {
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
  const currPray = findCurrPrayIndex(now, prayTimes);
  const currPrayInSeconds = hourStringToTotalSeconds(prayTimes[currPray]);
  const nowInSeconds = getTotalSeconds(now);
  const remainedSeconds = currPrayInSeconds - nowInSeconds;
  return { remainedSeconds, currPray };
}
