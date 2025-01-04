import { describe, it, expect } from 'vitest';
import { findRemainingSecondsToCurrPray } from './prayTimeHelper';
import { HourString } from '@/types';

describe('praying time helper', () => {
  it('Can find the current related praying time', () => {
    const prayTimes: HourString[] = ['05:42', '07:07', '12:37', '15:29', '17:58', '19:16'];
    const date1 = new Date(2023, 8, 22, 4);
    expect(findRemainingSecondsToCurrPray(date1, prayTimes)).toEqual({
      currPray: 0,
      remainedSeconds: 6120,
    });
    const date2 = new Date(2023, 8, 22, 5, 41);
    expect(findRemainingSecondsToCurrPray(date2, prayTimes)).toEqual({
      currPray: 0,
      remainedSeconds: 60,
    });
    const date3 = new Date(2023, 8, 22, 5, 42);
    expect(findRemainingSecondsToCurrPray(date3, prayTimes)).toEqual({
      currPray: 1,
      remainedSeconds: 5100,
    });
    const date4 = new Date(2023, 8, 22, 6, 42);
    expect(findRemainingSecondsToCurrPray(date4, prayTimes)).toEqual({
      remainedSeconds: 1500,
      currPray: 1,
    });
    const date5 = new Date(2023, 8, 22, 12, 30);
    expect(findRemainingSecondsToCurrPray(date5, prayTimes)).toEqual({
      currPray: 2,
      remainedSeconds: 420,
    });
    const date6 = new Date(2023, 8, 22, 12, 50);
    expect(findRemainingSecondsToCurrPray(date6, prayTimes)).toEqual({
      currPray: 3,
      remainedSeconds: 9540,
    });
    const date7 = new Date(2023, 8, 22, 15, 50);
    expect(findRemainingSecondsToCurrPray(date7, prayTimes)).toEqual({
      currPray: 4,
      remainedSeconds: 7680,
    });
    const date8 = new Date(2023, 8, 22, 18, 50);
    expect(findRemainingSecondsToCurrPray(date8, prayTimes)).toEqual({
      currPray: 5,
      remainedSeconds: 1560,
    });
    const date9 = new Date(2023, 8, 22, 23, 50);
    expect(findRemainingSecondsToCurrPray(date9, prayTimes)).toEqual({
      currPray: 0,
      remainedSeconds: 21120,
    });
  });
});
