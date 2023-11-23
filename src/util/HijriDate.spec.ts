import { describe, it, expect } from "vitest";
import { HijriDate } from "./HijriDate";

describe("Hijri Date", () => {
  it("Can convert the same gregorian date to the same hijri date", () => {
    const d1 = new HijriDate(1442, 3, 20);
    const d2 = new HijriDate(1442, 3, 20);
    expect(d1.dayDiff(d2)).toBe(0);
  });

  it("Can convert to tomorrow", () => {
    const d1 = new HijriDate(1442, 3, 20);
    const d2 = new HijriDate(1442, 3, 21);
    expect(d1.dayDiff(d2)).toBe(1);
  });

  it("Can convert to tomorrow even if the month is different", () => {
    const d1 = new HijriDate(1442, 3, 30);
    const d2 = new HijriDate(1442, 4, 1);
    expect(d1.dayDiff(d2)).toBe(1);
  });

  it("Can convert to first and last day of the month", () => {
    const d1 = new HijriDate(1442, 3, 1);
    const d2 = new HijriDate(1442, 3, 30);
    expect(d1.dayDiff(d2)).toBe(29);
  });

  it("Should throw error if day is greater than maximum days in a month", () => {
    expect(() => new HijriDate(1442, 3, 31)).toThrowError(
      "day is either smaller than 1 or greater than maximum days in the month"
    );
  });

  it("Should throw error if day is less than minimum days in a month", () => {
    expect(() => new HijriDate(1442, 3, 0)).toThrowError(
      "day is either smaller than 1 or greater than maximum days in the month"
    );
  });

  it("Can convert a gregorian date to hijri date", () => {
    const d1 = new HijriDate().toHijri(new Date(2020, 11, 6));
    expect(
      d1.getYear() === 1442 && d1.getMonth() == 3 && d1.getDay() === 21
    ).toBe(true);
  });

  it("Can convert 2020 start of sacred 3 months correctly", () => {
    const d1 = new HijriDate().toHijri(new Date(2020, 1, 25));
    expect(
      d1.getYear() === 1441 && d1.getMonth() === 6 && d1.getDay() === 1
    ).toBe(true);
  });
});
