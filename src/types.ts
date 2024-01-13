import { Ref } from "vue";
import { HijriDate } from "@/util/HijriDate";

export type SupportedLanguage =
  | "ar"
  | "az"
  | "de"
  | "en"
  | "es"
  | "fa"
  | "fr"
  | "id"
  | "it"
  | "kk"
  | "ko"
  | "ky"
  | "ms"
  | "ru"
  | "tr"
  | "zh";

export type RemainingTimeFormat =
  | "XX:YY:ZZ"
  | "XX:YY"
  | `X hour Y minute Z second`
  | `X hour Y minute`;

type _1To9 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type _0To9 = 0 | _1To9;
type _0To5 = 0 | 1 | 2 | 3 | 4 | 5;
type _0To3 = 0 | 1 | 2 | 3;

export type HourString =
  | `${0 | 1}${_0To9}:${_0To5}${_0To9}`
  | `${2}${_0To3}:${_0To5}${_0To9}`;

export interface RemainingToPray {
  currPrayIdx: Ref<number>;
  remainingTime: Ref<string>;
}

export interface RouteManager {
  readonly currentView: any;
  pathMenuItems: readonly PathMenuItem[];
  setViewFromPathMenuItem: (item: PathMenuItem) => void;
}

export interface DateStringFormat {
  year: "YYYY" | "YY" | "-";
  month: "MMMM" | "MMM" | "MM";
  weekDay: "DDDD" | "DDD" | "-";
}

export interface Sabbatical {
  month: number;
  day: number;
  name: string;
}

export interface SabbaticalCalendar {
  hijri: HijriDate;
  gregorian: Date;
  sabbatical: Sabbatical;
}

export type Place = {
  countryCode: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
};

export type Country = {
  code: string;
  name: string;
};

export type Cities = Record<string, [number, number]>;
export type Regions = Record<string, Cities>;

type MM = `0${_1To9}` | `1${0 | 1 | 2}`;
type DD = `${0}${_1To9}` | `${1 | 2}${_0To9}` | `3${0 | 1}`;

// YYYY-MM-DD formatted string
export type DateString = `${number}-${MM}-${DD}`;

export type TimesData = Record<DateString, HourString[]>;

export interface TimesForPlace {
  place: Place;
  times: TimesData;
}

export interface PathMenuItem {
  readonly icon: string;
  readonly title: string;
}
