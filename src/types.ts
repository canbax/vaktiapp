import type { Ref, ShallowRef } from 'vue';
import { HijriDate } from '@/util/HijriDate';

export type SupportedLanguage =
  | 'ar'
  | 'az'
  | 'de'
  | 'en'
  | 'es'
  | 'fa'
  | 'fr'
  | 'id'
  | 'it'
  | 'kk'
  | 'ko'
  | 'ky'
  | 'ms'
  | 'ru'
  | 'tr'
  | 'zh';

export interface UserInterfaceLanguage {
  languageCode: SupportedLanguage;
  text: string;
}

export type RemainingTimeFormat =
  | 'XX:YY:ZZ'
  | 'XX:YY'
  | `X hour Y minute Z second`
  | `X hour Y minute`;

type _1To9 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type _0To9 = 0 | _1To9;
type _0To5 = 0 | 1 | 2 | 3 | 4 | 5;
type _0To3 = 0 | 1 | 2 | 3;

export type HourString = `${0 | 1}${_0To9}:${_0To5}${_0To9}` | `${2}${_0To3}:${_0To5}${_0To9}`;

export interface RemainingToPray {
  currPrayIdx: Ref<number>;
  remainingTime: Ref<string>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RouteManager {
  readonly currentView: any;
  readonly currentPathMenuItem: ShallowRef<string | null>;
  isWidget: Readonly<Ref<boolean>>;
  pathMenuItems: readonly PathMenuItem[];
  setViewFromPathMenuItem: (item: PathMenuItem) => void;
}

export interface DateStringFormat {
  year: 'YYYY' | 'YY' | '-';
  month: 'MMMM' | 'MMM' | 'MM';
  weekDay: 'DDDD' | 'DDD' | '-';
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

export interface PathMenuItem {
  readonly icon: string;
  readonly title: string;
}
// Types defined in Vakit API project
export type ICountryTranslations = Record<CountryCode, Record<SupportedLanguage, string>>;
export type CountryCode =
  | 'AF'
  | 'AX'
  | 'AL'
  | 'DZ'
  | 'AS'
  | 'AD'
  | 'AO'
  | 'AI'
  | 'AQ'
  | 'AG'
  | 'AR'
  | 'AM'
  | 'AW'
  | 'AU'
  | 'AT'
  | 'AZ'
  | 'BS'
  | 'BH'
  | 'BD'
  | 'BB'
  | 'BY'
  | 'BE'
  | 'BZ'
  | 'BJ'
  | 'BM'
  | 'BT'
  | 'BO'
  | 'BQ'
  | 'BA'
  | 'BW'
  | 'BV'
  | 'BR'
  | 'IO'
  | 'BN'
  | 'BG'
  | 'BF'
  | 'BI'
  | 'CV'
  | 'KH'
  | 'CM'
  | 'CA'
  | 'KY'
  | 'CF'
  | 'TD'
  | 'CL'
  | 'CN'
  | 'CX'
  | 'CC'
  | 'CO'
  | 'KM'
  | 'CG'
  | 'CD'
  | 'CK'
  | 'CR'
  | 'CI'
  | 'HR'
  | 'CU'
  | 'CW'
  | 'CY'
  | 'CZ'
  | 'DK'
  | 'DJ'
  | 'DM'
  | 'DO'
  | 'EC'
  | 'EG'
  | 'SV'
  | 'GQ'
  | 'ER'
  | 'EE'
  | 'SZ'
  | 'ET'
  | 'FK'
  | 'FO'
  | 'FJ'
  | 'FI'
  | 'FR'
  | 'GF'
  | 'PF'
  | 'TF'
  | 'GA'
  | 'GM'
  | 'GE'
  | 'DE'
  | 'GH'
  | 'GI'
  | 'GR'
  | 'GL'
  | 'GD'
  | 'GP'
  | 'GU'
  | 'GT'
  | 'GG'
  | 'GN'
  | 'GW'
  | 'GY'
  | 'HT'
  | 'HM'
  | 'VA'
  | 'HN'
  | 'HK'
  | 'HU'
  | 'IS'
  | 'IN'
  | 'ID'
  | 'IR'
  | 'IQ'
  | 'IE'
  | 'IM'
  | 'IL'
  | 'IT'
  | 'JM'
  | 'JP'
  | 'JE'
  | 'JO'
  | 'KZ'
  | 'KE'
  | 'KI'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KG'
  | 'LA'
  | 'LV'
  | 'LB'
  | 'LS'
  | 'LR'
  | 'LY'
  | 'LI'
  | 'LT'
  | 'LU'
  | 'MO'
  | 'MK'
  | 'MG'
  | 'MW'
  | 'MY'
  | 'MV'
  | 'ML'
  | 'MT'
  | 'MH'
  | 'MQ'
  | 'MR'
  | 'MU'
  | 'YT'
  | 'MX'
  | 'FM'
  | 'MD'
  | 'MC'
  | 'MN'
  | 'ME'
  | 'MS'
  | 'MA'
  | 'MZ'
  | 'MM'
  | 'NA'
  | 'NR'
  | 'NP'
  | 'NL'
  | 'NC'
  | 'NZ'
  | 'NI'
  | 'NE'
  | 'NG'
  | 'NU'
  | 'NF'
  | 'MP'
  | 'NO'
  | 'OM'
  | 'PK'
  | 'PW'
  | 'PS'
  | 'PA'
  | 'PG'
  | 'PY'
  | 'PE'
  | 'PH'
  | 'PN'
  | 'PL'
  | 'PT'
  | 'PR'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RU'
  | 'RW'
  | 'BL'
  | 'SH'
  | 'KN'
  | 'LC'
  | 'MF'
  | 'PM'
  | 'VC'
  | 'WS'
  | 'SM'
  | 'ST'
  | 'SA'
  | 'SN'
  | 'RS'
  | 'SC'
  | 'SL'
  | 'SG'
  | 'SX'
  | 'SK'
  | 'SI'
  | 'SB'
  | 'SO'
  | 'ZA'
  | 'GS'
  | 'SS'
  | 'ES'
  | 'LK'
  | 'SD'
  | 'SR'
  | 'SJ'
  | 'SE'
  | 'CH'
  | 'SY'
  | 'TW'
  | 'TJ'
  | 'TZ'
  | 'TH'
  | 'TL'
  | 'TG'
  | 'TK'
  | 'TO'
  | 'TT'
  | 'TN'
  | 'TR'
  | 'TM'
  | 'TC'
  | 'TV'
  | 'UG'
  | 'UA'
  | 'AE'
  | 'GB'
  | 'US'
  | 'UM'
  | 'UY'
  | 'UZ'
  | 'VU'
  | 'VE'
  | 'VN'
  | 'VG'
  | 'VI'
  | 'WF'
  | 'EH'
  | 'YE'
  | 'ZM'
  | 'ZW'
  | string;
export interface EarthLocation {
  latitude: number;
  longitude: number;
}
export interface Place extends EarthLocation {
  id: number;
  name: string;
  countryCode: string;
  stateName: string;
  alternativeNames: string[];
}
export interface PlaceMatchWithCountry extends Place {
  country: string;
  matchingString: string;
  isMatchingAlternativeName: boolean;
  editDistance: number;
}
export interface PlaceWithCountry extends Place {
  country: string;
}

export type GenericPlace = PlaceWithCountry | PlaceMatchWithCountry;

export type AppTheme = 'light' | 'dark';

export type CalculatorMadhab = 'shafi' | 'hanafi';
