import { describe, it, expect } from "vitest";
import { intToStr, secondsToHumanReadable } from "./dateAndTime";
import { RemainingTimeFormat } from "@/types";

describe("DateAndTime utils", () => {
  it("Can convert an integer to 2 digit string", () => {
    expect(intToStr(4)).toEqual("04");
    expect(intToStr(10)).toEqual("10");
    expect(() => intToStr(-1)).toThrowError("less than 0 or greater than 99");
    expect(() => intToStr(101)).toThrowError("less than 0 or greater than 99");
    expect(() => intToStr(NaN)).toThrowError("is not an integer");
  });

  describe("can convert seconds to human readable format", () => {
    describe("cases with 1 hour", () => {
      it.each([
        {
          timeFormat: "XX:YY:ZZ" as RemainingTimeFormat,
          expectedResult: "01:00:00",
        },
        {
          timeFormat: "XX:YY" as RemainingTimeFormat,
          expectedResult: "01:00",
        },
        {
          timeFormat: "X hour Y minute Z second" as RemainingTimeFormat,
          expectedResult: "1 hour",
        },
        {
          timeFormat: "X hour Y minute" as RemainingTimeFormat,
          expectedResult: "1 hour",
        },
      ])("convert 1 hour in format %s", ({ timeFormat, expectedResult }) => {
        const oneHour = secondsToHumanReadable(
          3600,
          "hour",
          "minute",
          "second",
          timeFormat
        );
        expect(oneHour).toEqual(expectedResult);
      });

      it.each([
        {
          timeFormat: "XX:YY:ZZ" as RemainingTimeFormat,
          expectedResult: "01:01:00",
        },
        {
          timeFormat: "XX:YY" as RemainingTimeFormat,
          expectedResult: "01:01",
        },
        {
          timeFormat: "X hour Y minute Z second" as RemainingTimeFormat,
          expectedResult: "1 hour 1 minute",
        },
        {
          timeFormat: "X hour Y minute" as RemainingTimeFormat,
          expectedResult: "1 hour 1 minute",
        },
      ])(
        "convert 1 hour 1 minute in format %s",
        ({ timeFormat, expectedResult }) => {
          const oneHour = secondsToHumanReadable(
            3660,
            "hour",
            "minute",
            "second",
            timeFormat
          );
          expect(oneHour).toEqual(expectedResult);
        }
      );

      it.each([
        {
          timeFormat: "XX:YY:ZZ" as RemainingTimeFormat,
          expectedResult: "01:01:01",
        },
        {
          timeFormat: "XX:YY" as RemainingTimeFormat,
          expectedResult: "01:01",
        },
        {
          timeFormat: "X hour Y minute Z second" as RemainingTimeFormat,
          expectedResult: "1 hour 1 minute 1 second",
        },
        {
          timeFormat: "X hour Y minute" as RemainingTimeFormat,
          expectedResult: "1 hour 1 minute",
        },
      ])(
        "convert 1 hour 1 minute 1 second in format %s",
        ({ timeFormat, expectedResult }) => {
          const oneHour = secondsToHumanReadable(
            3661,
            "hour",
            "minute",
            "second",
            timeFormat
          );
          expect(oneHour).toEqual(expectedResult);
        }
      );

      it.each([
        {
          timeFormat: "XX:YY:ZZ" as RemainingTimeFormat,
          expectedResult: "01:00:01",
        },
        {
          timeFormat: "XX:YY" as RemainingTimeFormat,
          expectedResult: "01:00",
        },
        {
          timeFormat: "X hour Y minute Z second" as RemainingTimeFormat,
          expectedResult: "1 hour 1 second",
        },
        {
          timeFormat: "X hour Y minute" as RemainingTimeFormat,
          expectedResult: "1 hour",
        },
      ])(
        "convert 1 hour 1 second in format %s",
        ({ timeFormat, expectedResult }) => {
          const oneHour = secondsToHumanReadable(
            3601,
            "hour",
            "minute",
            "second",
            timeFormat
          );
          expect(oneHour).toEqual(expectedResult);
        }
      );
    });

    describe("cases with 0 hour", () => {
      it.each([
        {
          timeFormat: "XX:YY:ZZ" as RemainingTimeFormat,
          expectedResult: "00:01:01",
        },
        {
          timeFormat: "XX:YY" as RemainingTimeFormat,
          expectedResult: "00:01",
        },
        {
          timeFormat: "X hour Y minute Z second" as RemainingTimeFormat,
          expectedResult: "1 minute 1 second",
        },
        {
          timeFormat: "X hour Y minute" as RemainingTimeFormat,
          expectedResult: "1 minute",
        },
      ])(
        "convert 1 minute 1 second in format %s",
        ({ timeFormat, expectedResult }) => {
          const oneHour = secondsToHumanReadable(
            61,
            "hour",
            "minute",
            "second",
            timeFormat
          );
          expect(oneHour).toEqual(expectedResult);
        }
      );

      it.each([
        {
          timeFormat: "XX:YY:ZZ" as RemainingTimeFormat,
          expectedResult: "00:01:00",
        },
        {
          timeFormat: "XX:YY" as RemainingTimeFormat,
          expectedResult: "00:01",
        },
        {
          timeFormat: "X hour Y minute Z second" as RemainingTimeFormat,
          expectedResult: "1 minute",
        },
        {
          timeFormat: "X hour Y minute" as RemainingTimeFormat,
          expectedResult: "1 minute",
        },
      ])(
        "convert 1 minute 0 second in format %s",
        ({ timeFormat, expectedResult }) => {
          const oneHour = secondsToHumanReadable(
            60,
            "hour",
            "minute",
            "second",
            timeFormat
          );
          expect(oneHour).toEqual(expectedResult);
        }
      );

      it.each([
        {
          timeFormat: "XX:YY:ZZ" as RemainingTimeFormat,
          expectedResult: "00:00:01",
        },
        {
          timeFormat: "XX:YY" as RemainingTimeFormat,
          expectedResult: "00:00",
        },
        {
          timeFormat: "X hour Y minute Z second" as RemainingTimeFormat,
          expectedResult: "1 second",
        },
        {
          timeFormat: "X hour Y minute" as RemainingTimeFormat,
          expectedResult: "1 second",
        },
      ])(
        "convert 0 minute 1 second in format %s",
        ({ timeFormat, expectedResult }) => {
          const oneHour = secondsToHumanReadable(
            1,
            "hour",
            "minute",
            "second",
            timeFormat
          );
          expect(oneHour).toEqual(expectedResult);
        }
      );

      it.each([
        {
          timeFormat: "XX:YY:ZZ" as RemainingTimeFormat,
          expectedResult: "00:00:00",
        },
        {
          timeFormat: "XX:YY" as RemainingTimeFormat,
          expectedResult: "00:00",
        },
        {
          timeFormat: "X hour Y minute Z second" as RemainingTimeFormat,
          expectedResult: "0 second",
        },
        {
          timeFormat: "X hour Y minute" as RemainingTimeFormat,
          expectedResult: "0 second",
        },
      ])(
        "convert 0 minute 0 second in format %s",
        ({ timeFormat, expectedResult }) => {
          const oneHour = secondsToHumanReadable(
            0,
            "hour",
            "minute",
            "second",
            timeFormat
          );
          expect(oneHour).toEqual(expectedResult);
        }
      );
    });
  });
});
