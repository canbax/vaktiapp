import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from "adhan";
import { HourString, TimesData } from "./types";
import { extractTimeFromDate, dateToStandardString } from "@/util/dateAndTime";

export function getTimes(
  lat: number,
  lng: number,
  date: Date,
  days: number,
  timezoneOffset: number,
  calculationMethod: keyof typeof CalculationMethod = "Turkey"
): TimesData {
  const coordinates = new Coordinates(lat, lng);
  const params = CalculationMethod[calculationMethod]();
  params.madhab = Madhab.Shafi;
  const r: TimesData = {};
  for (let i = 0; i < days; i++) {
    const times = new PrayerTimes(coordinates, date, params);
    const arr: HourString[] = [];
    arr.push(extractTimeFromDate(times.fajr, timezoneOffset));
    arr.push(extractTimeFromDate(times.sunrise, timezoneOffset));
    arr.push(extractTimeFromDate(times.dhuhr, timezoneOffset));
    arr.push(extractTimeFromDate(times.asr, timezoneOffset));
    arr.push(extractTimeFromDate(times.maghrib, timezoneOffset));
    arr.push(extractTimeFromDate(times.isha, timezoneOffset));
    r[dateToStandardString(date)] = arr;
    date.setDate(date.getDate() + 1);
  }
  return r;
}
