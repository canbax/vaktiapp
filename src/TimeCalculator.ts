import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from "adhan";
import { HourString, TimesData } from "./types";
import { extractTimeFromDate, dateToStandardString } from "@/util/dateAndTime";
import { ValueOf } from "adhan/lib/types/TypeUtils";

/**
 * Mutates date
 *
 * @export
 * @param {number} lat
 * @param {number} lng
 * @param {Date} date
 * @param {number} days
 * @param {keyof typeof CalculationMethod} [calculationMethod="Turkey"]
 * @returns {TimesData}
 */
export function getTimes(
  lat: number,
  lng: number,
  date: Date,
  days: number,
  calculationMethod: keyof typeof CalculationMethod = "Turkey",
  madhab: ValueOf<typeof Madhab> = Madhab.Shafi
): TimesData {
  const coordinates = new Coordinates(lat, lng);
  const params = CalculationMethod[calculationMethod]();
  params.madhab = madhab;
  const r: TimesData = {};
  const date2 = new Date(date);
  const timezoneOffset = date2.getTimezoneOffset() * -1;
  for (let i = 0; i < days; i++) {
    const times = new PrayerTimes(coordinates, date2, params);
    const arr: HourString[] = [];
    arr.push(extractTimeFromDate(times.fajr, timezoneOffset));
    arr.push(extractTimeFromDate(times.sunrise, timezoneOffset));
    arr.push(extractTimeFromDate(times.dhuhr, timezoneOffset));
    arr.push(extractTimeFromDate(times.asr, timezoneOffset));
    arr.push(extractTimeFromDate(times.maghrib, timezoneOffset));
    arr.push(extractTimeFromDate(times.isha, timezoneOffset));
    r[dateToStandardString(date2)] = arr;
    date2.setDate(date2.getDate() + 1);
  }
  return r;
}
