import { useStorage } from '@vueuse/core';
import { CalculationMethod } from 'adhan';
import type {
  AppTheme,
  CalculatorMadhab,
  DateStringFormat,
  GenericPlace,
  RemainingTimeFormat,
  SupportedLanguage,
  UserInterfaceLanguage,
} from '@/types';

export function useSettings() {
  const ALL_LANGUAGES: UserInterfaceLanguage[] = [
    { text: 'Türkçe', languageCode: 'tr' },
    { text: 'English', languageCode: 'en' },
    { text: 'Pусский', languageCode: 'ru' },
    { text: 'Española', languageCode: 'es' },
    { text: 'فارسی', languageCode: 'fa' },
    { text: 'Français', languageCode: 'fr' },
    { text: 'Deutsch', languageCode: 'de' },
    { text: 'Chinese', languageCode: 'zh' },
    { text: 'عربى', languageCode: 'ar' },
    { text: 'Indonesia', languageCode: 'id' },
    { text: 'Italian', languageCode: 'it' },
    { text: 'Kazakh', languageCode: 'kk' },
    { text: 'Korean', languageCode: 'ko' },
    { text: 'Kyrgyz', languageCode: 'ky' },
    { text: 'Malay', languageCode: 'ms' },
  ];

  /**
   * returns 2 letter language code ('en', 'de', 'tr', ...) of the browser. By default returns 'en'
   */
  function getDefaultLangCode(): SupportedLanguage {
    const userLang = navigator.language;
    if (userLang && typeof userLang === 'string' && userLang.includes('-')) {
      const langCode = userLang.split('-')[0] as SupportedLanguage;
      if (ALL_LANGUAGES.find((x) => x.languageCode === langCode)) {
        return langCode;
      } else {
        console.warn(`${langCode} is not a supported language`);
      }
    } else {
      console.warn(`${userLang} is not a valid language indicator`);
    }
    return 'en';
  }

  function getLanguageFromCode(code: SupportedLanguage | string): UserInterfaceLanguage {
    return (
      ALL_LANGUAGES.find((x) => x.languageCode === code) ?? { text: 'English', languageCode: 'en' }
    );
  }

  function getDefaultLanguage() {
    return getLanguageFromCode(getDefaultLangCode());
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const currentPlace = useStorage<GenericPlace | null>('currentPlace', null, localStorage, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v),
    },
  });

  const currentUITheme = useStorage<AppTheme>('currentUITheme', 'light');

  const currentDate = useStorage<string | null>('currentDate', null);

  const persistCurrentDate = useStorage<boolean>('persistCurrentDate', false);

  const currentCountry = useStorage<string>('currentCountry', 'tr');

  const currentTimeFormat = useStorage<RemainingTimeFormat>('currentTimeFormat', 'XX:YY:ZZ');

  const currYearFormat = useStorage<DateStringFormat['year']>('currYearFormat', 'YYYY');

  const currMonthFormat = useStorage<DateStringFormat['month']>('currMonthFormat', 'MMMM');

  const currWeekdayFormat = useStorage<DateStringFormat['weekDay']>(
    'currWeekdayFormat',
    'DDDD',
    localStorage,
  );

  const calculatorMethod = useStorage<keyof typeof CalculationMethod>('calculatorMethod', 'Turkey');

  const calculatorMadhab = useStorage<CalculatorMadhab>('calculatorMadhab', 'shafi');

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const currentLanguage = useStorage<UserInterfaceLanguage>(
    'currentLanguage',
    getDefaultLanguage(),
    localStorage,
    {
      serializer: {
        read: (v: any) => (v ? JSON.parse(v) : getDefaultLanguage()),
        write: (v: any) => JSON.stringify(v),
      },
    },
  );

  const selectedPlaces = useStorage<Map<number, GenericPlace>>(
    'selectedPlaces',
    new Map<number, GenericPlace>(),
    localStorage,
    {
      serializer: {
        read: (v: string) =>
          v
            ? new Map<number, GenericPlace>(JSON.parse(v).map((x: GenericPlace) => [x.id, x]))
            : new Map<number, GenericPlace>(),
        write: (v: Map<number, GenericPlace>) => JSON.stringify(Array.from(v.values())),
      },
    },
  );

  return {
    getLanguageFromCode,
    currentPlace,
    currentCountry,
    currentLanguage,
    selectedPlaces,
    currentUITheme,
    currentTimeFormat,
    currYearFormat,
    currMonthFormat,
    currWeekdayFormat,
    currentDate,
    persistCurrentDate,
    calculatorMethod,
    calculatorMadhab,
    ALL_LANGUAGES,
  };
}
