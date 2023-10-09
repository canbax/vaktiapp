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

  it("Can convert to tomorrow even if the month is different", () => {
    const d1 = new HijriDate(1442, 3, 30);
    const d2 = new HijriDate(1442, 4, 1);
    expect(d1.dayDiff(d2)).toBe(1);
  });
});
