import { describe, it, expect } from "vitest";
import {
  getTotalSeconds,
  hourStringToTotalSeconds,
  intToStr,
  secondsToHumanReadable,
  dateToString,
} from "./dateAndTime";
import { DateStringFormat, RemainingTimeFormat } from "@/types";
import { translate } from "./i18n";

describe("Date and time utils", () => {
  it("Can convert an integer to 2 digit string", () => {
    expect(intToStr(4)).toEqual("04");
    expect(intToStr(10)).toEqual("10");
    expect(() => intToStr(-1)).toThrowError("less than 0 or greater than 99");
    expect(() => intToStr(101)).toThrowError("less than 0 or greater than 99");
    expect(() => intToStr(NaN)).toThrowError("is not an integer");
  });

  describe("can convert seconds to human readable format", () => {
    describe("cases with 1 hour", () => {
      const formatsWithOnlyHour = [
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
      ];
      it.each(formatsWithOnlyHour)(
        "convert 1 hour in format %s",
        ({ timeFormat, expectedResult }) => {
          const oneHour = secondsToHumanReadable(
            3600,
            "hour",
            "minute",
            "second",
            timeFormat
          );
          expect(oneHour).toEqual(expectedResult);
        }
      );

      const formatsWithOnlyHourAndMinute = [
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
      ];
      it.each(formatsWithOnlyHourAndMinute)(
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

      const formatsWithHourMinuteAndSeconds = [
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
      ];
      it.each(formatsWithHourMinuteAndSeconds)(
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

      const formatsWithHourAndSecond = [
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
      ];
      it.each(formatsWithHourAndSecond)(
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
      const formatsWithOnlyMinuteAndSecond = [
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
      ];
      it.each(formatsWithOnlyMinuteAndSecond)(
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

      const formatsWithOnlyMinute = [
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
      ];
      it.each(formatsWithOnlyMinute)(
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

      const formatsWithOnlySecond = [
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
      ];
      it.each(formatsWithOnlySecond)(
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

      const formatsWithAllZero = [
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
      ];
      it.each(formatsWithAllZero)(
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

  it("Can convert hour strings to total seconds", () => {
    expect(hourStringToTotalSeconds("00:00")).toEqual(0);
    expect(hourStringToTotalSeconds("00:01")).toEqual(60);
    expect(hourStringToTotalSeconds("23:59")).toEqual(86340);
    expect(hourStringToTotalSeconds("01:00")).toEqual(3600);
  });

  it("Can get total seconds of the time in a date", () => {
    expect(getTotalSeconds(new Date(2000, 12, 2, 0, 0, 0))).toEqual(0);
    expect(getTotalSeconds(new Date(2000, 12, 2, 0, 0, 1))).toEqual(1);
    expect(getTotalSeconds(new Date(2000, 12, 2, 0, 1, 1))).toEqual(61);
    expect(getTotalSeconds(new Date(2000, 12, 2, 1, 1, 1))).toEqual(3661);
    expect(getTotalSeconds(new Date(2000, 12, 2, 13, 10, 0))).toEqual(47400);
  });

  describe("can convert date to human readable format", () => {
    const yearFormats: {
      dateFormat: DateStringFormat;
      expectedResult: string;
    }[] = [
      {
        dateFormat: {
          year: "-",
          month: "MM",
          weekDay: "-",
        },
        expectedResult: "25 10",
      },
      {
        dateFormat: {
          year: "YY",
          month: "MM",
          weekDay: "-",
        },
        expectedResult: "25 10 23",
      },
      {
        dateFormat: {
          year: "YYYY",
          month: "MM",
          weekDay: "-",
        },
        expectedResult: "25 10 2023",
      },
    ];
    it.each(yearFormats)(
      "convert date to string with year format $dateFormat.year",
      ({ dateFormat, expectedResult }) => {
        const oneHour = dateToString(
          new Date(2023, 9, 25),
          dateFormat,
          translate
        );
        expect(oneHour).toEqual(expectedResult);
      }
    );

    const monthFormats: {
      dateFormat: DateStringFormat;
      expectedResult: string;
    }[] = [
      {
        dateFormat: {
          year: "-",
          month: "MM",
          weekDay: "-",
        },
        expectedResult: "25 10",
      },
      {
        dateFormat: {
          year: "-",
          month: "MMM",
          weekDay: "-",
        },
        expectedResult: "25 Oct",
      },
      {
        dateFormat: {
          year: "-",
          month: "MMMM",
          weekDay: "-",
        },
        expectedResult: "25 October",
      },
    ];
    it.each(monthFormats)(
      "convert date to string with month format $dateFormat.month",
      ({ dateFormat, expectedResult }) => {
        const oneHour = dateToString(
          new Date(2023, 9, 25),
          dateFormat,
          translate
        );
        expect(oneHour).toEqual(expectedResult);
      }
    );

    const dayFormats: {
      dateFormat: DateStringFormat;
      expectedResult: string;
    }[] = [
      {
        dateFormat: {
          year: "-",
          month: "MM",
          weekDay: "-",
        },
        expectedResult: "25 10",
      },
      {
        dateFormat: {
          year: "-",
          month: "MM",
          weekDay: "DDD",
        },
        expectedResult: "25 10 Wed",
      },
      {
        dateFormat: {
          year: "-",
          month: "MM",
          weekDay: "DDDD",
        },
        expectedResult: "25 10 Wednesday",
      },
    ];
    it.each(dayFormats)(
      "convert date to string with week day format $dateFormat.weekDay",
      ({ dateFormat, expectedResult }) => {
        const oneHour = dateToString(
          new Date(2023, 9, 25),
          dateFormat,
          translate
        );
        expect(oneHour).toEqual(expectedResult);
      }
    );

    it("should convert single digit days to by adding prefix '0'", () => {
      const dateFormat: DateStringFormat = {
        year: "YYYY",
        month: "MM",
        weekDay: "-",
      };
      const oneHour = dateToString(new Date(2023, 9, 2), dateFormat, translate);
      expect(oneHour).toEqual("02 10 2023");
    });
  });
});
