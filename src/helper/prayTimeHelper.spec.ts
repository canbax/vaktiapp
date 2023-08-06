import { describe, it, expect } from "vitest";
import { findCurrPrayIndex } from "./prayTimeHelper";
import { HourString } from "@/types";

describe("praying time helper", () => {
  it("Can find the current related praying time", () => {
    const prayTimes: HourString[] = [
      "05:42",
      "07:07",
      "12:37",
      "15:29",
      "17:58",
      "19:16",
    ];
    const date1 = new Date(2023, 8, 22, 4);
    expect(findCurrPrayIndex(date1, prayTimes)).toEqual(0);
    const date2 = new Date(2023, 8, 22, 5, 41);
    expect(findCurrPrayIndex(date2, prayTimes)).toEqual(0);
    const date3 = new Date(2023, 8, 22, 5, 42);
    expect(findCurrPrayIndex(date3, prayTimes)).toEqual(1);
    const date4 = new Date(2023, 8, 22, 6, 42);
    expect(findCurrPrayIndex(date4, prayTimes)).toEqual(1);
    const date5 = new Date(2023, 8, 22, 12, 30);
    expect(findCurrPrayIndex(date5, prayTimes)).toEqual(2);
    const date6 = new Date(2023, 8, 22, 12, 50);
    expect(findCurrPrayIndex(date6, prayTimes)).toEqual(3);
    const date7 = new Date(2023, 8, 22, 15, 50);
    expect(findCurrPrayIndex(date7, prayTimes)).toEqual(4);
    const date8 = new Date(2023, 8, 22, 18, 50);
    expect(findCurrPrayIndex(date8, prayTimes)).toEqual(5);
    const date9 = new Date(2023, 8, 22, 23, 50);
    expect(findCurrPrayIndex(date9, prayTimes)).toEqual(0);
  });
});
