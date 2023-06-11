import { describe, it, expect } from "vitest";
import { intToStr } from "./dateAndTime";

describe("DateAndTime utils", () => {
  it("Can convert an integer to 2 digit string", () => {
    expect(intToStr(4)).toEqual("04");
    expect(intToStr(10)).toEqual("10");
    expect(() => intToStr(-1)).toThrowError("less than 0 or greater than 99");
    expect(() => intToStr(101)).toThrowError("less than 0 or greater than 99");
    expect(() => intToStr(NaN)).toThrowError("is not an integer");
  });

  it("Can convert an integer to 2 digit string", () => {
    // secondsToHumanReadable(1);
    // expect(wrapper.text()).toContain("remaining time");
  });
});
