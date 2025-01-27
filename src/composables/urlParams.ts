import { ApiClient } from '@/ApiClient';
import { useUrlSearchParams, isDefined } from '@vueuse/core';
import type {
  AppTheme,
  CalculatorMadhab,
  DateStringFormat,
  GenericPlace,
  PlaceWithCountry,
  RemainingTimeFormat,
  UserInterfaceLanguage,
} from '@/types';
import { CalculationMethod } from 'adhan';
import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useSettings } from './settings';
import { dateToStandardString, isToday } from '@/util/dateAndTime';
import { useUIState } from './userInterfaceState';

interface Params {
  currPlaceParam: Ref<GenericPlace | null>;
  theme: Ref<AppTheme>;
  zoom: Ref<number>;
  isShowHijri: Ref<boolean>;
  year: Ref<DateStringFormat['year']>;
  month: Ref<DateStringFormat['month']>;
  weekDay: Ref<DateStringFormat['weekDay']>;
  time: Ref<RemainingTimeFormat>;
  method: Ref<keyof typeof CalculationMethod>;
  madhab: Ref<CalculatorMadhab>;
  date?: Ref<string | null>;
  language?: Ref<UserInterfaceLanguage>;
}

interface SearchParams {
  city: string;
  date: string;
  theme: string;
  language: string;
  zoom: string;
  isShowHijri: string;
  year: string;
  month: string;
  weekDay: string;
  time: string;
  method: string;
  madhab: string;
}

export function encodeParamsForIframe(params: Params): string {
  const urlSearchParams = new URLSearchParams({
    city: params.currPlaceParam?.value?.id + '',
    theme: params.theme.value,
    isShowHijri: params.isShowHijri.value ? '1' : '0',
    year: params.year.value,
    month: params.month.value,
    weekDay: params.weekDay.value,
    time: params.time.value,
    method: params.method.value,
    madhab: params.madhab.value,
    zoom: params.zoom.value + '',
  });
  if (isDefined(params?.date?.value)) {
    urlSearchParams.append('date', params.date.value);
  }
  if (isDefined(params?.language?.value)) {
    urlSearchParams.append('language', params.language.value.languageCode);
  }

  return urlSearchParams.toString();
}

export function useUrlParams() {
  const params = useUrlSearchParams<SearchParams>('history');
  const settings = useSettings();
  const UIState = useUIState();

  const currentPlaceRef = ref<PlaceWithCountry | null>(null);

  // Watch the city parameter and update currentPlaceRef reactively
  watch(
    () => params.city,
    async (newCity) => {
      if (isDefined(newCity) && !Number.isNaN(Number(newCity))) {
        currentPlaceRef.value = await new ApiClient().placeById(
          Number(newCity),
          settings.currentLanguage.value.languageCode,
        );
      } else {
        currentPlaceRef.value = null;
      }
    },
    { immediate: true }, // Ensure the watch runs immediately
  );

  const currentPlace = computed(() => currentPlaceRef.value);

  const theme = computed<AppTheme>(() => {
    if (isDefined(params.theme) && typeof params.theme === 'string') {
      return params.theme as AppTheme;
    }
    return 'light';
  });

  const isShowHijriDate = computed<boolean>(() => {
    if (isDefined(params.isShowHijri) && !Number.isNaN(params.isShowHijri)) {
      return Number(params.isShowHijri) === 1;
    }
    return false;
  });

  const currDate = computed<Date>(() => {
    if (isDefined(params.date) && typeof params.date === 'string') {
      const d = new Date(params.date);
      if (!isNaN(d.getTime())) {
        return d;
      }
    }
    return new Date();
  });

  const zoom = computed<number>(() => {
    if (isDefined(params.zoom) && !Number.isNaN(params.zoom)) {
      return Number(params.zoom);
    }
    return 1;
  });

  const currentTimeFormat = computed<RemainingTimeFormat>(() => {
    if (isDefined(params.time) && typeof params.time === 'string') {
      return params.time as RemainingTimeFormat;
    }
    return 'XX:YY:ZZ';
  });

  const currYearFormat = computed<DateStringFormat['year']>(() => {
    if (isDefined(params.year) && typeof params.year === 'string') {
      return params.year as DateStringFormat['year'];
    }
    return 'YYYY';
  });

  const currMonthFormat = computed<DateStringFormat['month']>(() => {
    if (isDefined(params.month) && typeof params.month === 'string') {
      return params.month as DateStringFormat['month'];
    }
    return 'MMMM';
  });

  const currWeekdayFormat = computed<DateStringFormat['weekDay']>(() => {
    if (isDefined(params.weekDay) && typeof params.weekDay === 'string') {
      return params.weekDay as DateStringFormat['weekDay'];
    }
    return 'DDDD';
  });

  const calculatorMethod = computed<keyof typeof CalculationMethod>(() => {
    if (isDefined(params.method) && typeof params.method === 'string') {
      return params.method as keyof typeof CalculationMethod;
    }
    return 'Turkey';
  });

  const calculatorMadhab = computed<CalculatorMadhab>(() => {
    if (isDefined(params.madhab) && typeof params.madhab === 'string') {
      return params.madhab as CalculatorMadhab;
    }
    return 'shafi';
  });

  async function applyUrlParamsToSettings() {
    settings.currentLanguage.value = settings.getLanguageFromCode(params.language);
    UIState.currentZoom.value = zoom.value;
    UIState.isShowHijriDate.value = isShowHijriDate.value;
    UIState.isSideBarOpen.value = false;
    settings.calculatorMadhab.value = calculatorMadhab.value;
    settings.calculatorMethod.value = calculatorMethod.value;
    settings.currMonthFormat.value = currMonthFormat.value;
    settings.currWeekdayFormat.value = currWeekdayFormat.value;
    settings.currYearFormat.value = currYearFormat.value;
    if (isToday(currDate.value)) {
      settings.currentDate.value = null;
    } else {
      settings.currentDate.value = dateToStandardString(currDate.value);
    }

    settings.currentUITheme.value = theme.value;
    settings.currentTimeFormat.value = currentTimeFormat.value;
    settings.currentPlace.value = await new ApiClient().placeById(
      Number(params.city),
      settings.currentLanguage.value.languageCode,
    );
  }

  function encodeSettingsToUrlParams(): string {
    return encodeParamsForIframe({
      currPlaceParam: settings.currentPlace,
      isShowHijri: UIState.isShowHijriDate,
      language: settings.currentLanguage,
      madhab: settings.calculatorMadhab,
      method: settings.calculatorMethod,
      month: settings.currMonthFormat,
      theme: settings.currentUITheme,
      time: settings.currentTimeFormat,
      weekDay: settings.currWeekdayFormat,
      year: settings.currYearFormat,
      zoom: UIState.currentZoom,
      date: settings.currentDate,
    });
  }

  return {
    calculatorMadhab,
    calculatorMethod,
    currDate,
    currentPlace,
    currentTimeFormat,
    currMonthFormat,
    currWeekdayFormat,
    currYearFormat,
    isShowHijriDate,
    theme,
    applyUrlParamsToSettings,
    encodeSettingsToUrlParams,
  };
}

export const WEB_BASE_URL = 'https://www.vakitapp.com' as const;
