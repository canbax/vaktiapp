import { HijriDate } from "./HijriDate";

export interface Country {
  code: string;
  name: string;
  englishName: string;
}

export interface UiLanguage {
  txt: string;
  code: string;
}

// export const THEMES: any = {
//   light1: {
//     primary: '#1976D2',
//     background: '#ffffff',
//     secondary: '#424242',
//     accent: '#82B1FF',
//     error: '#FF5252',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FFC107',
//   },
//   light2: {
//     primary: '#2196f3',
//     secondary: '#f50057',
//     background: '#ffffff',
//     accent: '#82B1FF',
//     error: '#FF5252',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FFC107',
//   },
//   dark1: {
//     primary: '#000000',
//     secondary: '#000000',
//     background: '#ffffff',
//     accent: '#000000',
//     error: '#000000',
//     info: '#000000',
//     success: '#000000',
//     warning: '#000000',
//   },
// }

export interface StringDict {
  [key: string]: string;
}

export interface IntDict {
  [key: number]: number[];
}

export interface Sabbatical {
  month: number;
  day: number;
  name: string;
}

export interface SabbaticalCalendar {
  hijri: HijriDate;
  gre: Date;
  sabb: Sabbatical;
}

export type Locale = {
  country: string;
  region: string;
  city: string;
};

export type Place = {
  countryCode: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
};

export type CountryData = {
  code: string;
  regions: Record<string, Record<string, [number, number]>>;
};

type _1To9 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type _0To9 = 0 | _1To9;
type _0To5 = 0 | 1 | 2 | 3 | 4 | 5;
type _0To3 = 0 | 1 | 2 | 3;

export type HourString =
  | `${0 | 1}${_0To9}:${_0To5}${_0To9}`
  | `${2}${_0To3}:${_0To5}${_0To9}`;

type MM = `0${_1To9}` | `1${0 | 1 | 2}`;
type DD = `${0}${_1To9}` | `${1 | 2}${_0To9}` | `3${0 | 1}`;

// YYYY-MM-DD formatted string
export type DateString = `${number}-${MM}-${DD}`;

export type TimesData = Record<DateString, HourString[]>;

export type TimesForLocale = { place: Place; times: TimesData };
