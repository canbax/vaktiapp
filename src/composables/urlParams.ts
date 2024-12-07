import { ApiClient } from "@/ApiClient";
import { useUrlSearchParams, isDefined } from "@vueuse/core";
import {
  AppTheme,
  CalculatorMadhab,
  DateStringFormat,
  GenericPlace,
  PlaceWithCountry,
  RemainingTimeFormat,
  UserInterfaceLanguage,
} from "@/types";
import { CalculationMethod } from "adhan";
import { Ref, computed, ref, watch } from "vue";
import { useSettings } from "./settings";

interface Params {
  currPlaceParam: Ref<GenericPlace>;
  theme: Ref<AppTheme>;
  language: Ref<UserInterfaceLanguage>;
  zoom: Ref<number>;
  isShowHijri: Ref<boolean>;
  year: Ref<DateStringFormat["year"]>;
  month: Ref<DateStringFormat["month"]>;
  weekDay: Ref<DateStringFormat["weekDay"]>;
  time: Ref<RemainingTimeFormat>;
  method: Ref<keyof typeof CalculationMethod>;
  madhab: Ref<CalculatorMadhab>;
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

export function encodeParamsForIframe(params: Params) {
  return new URLSearchParams({
    city: params.currPlaceParam.value.id + "",
    theme: params.theme.value,
    isShowHijri: params.isShowHijri.value ? "1" : "0",
    year: params.year.value,
    month: params.month.value,
    weekDay: params.weekDay.value,
    time: params.time.value,
    method: params.method.value,
    madhab: params.madhab.value,
  }).toString();
}

export function useUrlParams() {
  const params = useUrlSearchParams<SearchParams>("history");
  const { currentLanguage } = useSettings();

  const currentPlaceRef = ref<PlaceWithCountry | null>(null);

  // Watch the city parameter and update currentPlaceRef reactively
  watch(
    () => params.city,
    async (newCity) => {
      if (isDefined(newCity) && !Number.isNaN(Number(newCity))) {
        currentPlaceRef.value = await new ApiClient().placeById(
          Number(newCity),
          currentLanguage.value.languageCode
        );
      } else {
        currentPlaceRef.value = null;
      }
    },
    { immediate: true } // Ensure the watch runs immediately
  );

  const currentPlace = computed(() => currentPlaceRef.value);

  const theme = computed<AppTheme>(() => {
    if (isDefined(params.theme) && typeof params.theme === "string") {
      return params.theme as AppTheme;
    }
    return "light";
  });

  const isShowHijriDate = computed<boolean>(() => {
    if (isDefined(params.isShowHijri) && !Number.isNaN(params.isShowHijri)) {
      return Number(params.isShowHijri) === 1;
    }
    return false;
  });

  const currDate = computed<Date>(() => {
    if (isDefined(params.date) && typeof params.date === "string") {
      const d = new Date(params.date);
      if (!isNaN(d.getTime())) {
        return d;
      }
    }
    return new Date();
  });

  const currentTimeFormat = computed<RemainingTimeFormat>(() => {
    if (isDefined(params.time) && typeof params.time === "string") {
      return params.time as RemainingTimeFormat;
    }
    return "XX:YY:ZZ";
  });

  const currYearFormat = computed<DateStringFormat["year"]>(() => {
    if (isDefined(params.year) && typeof params.year === "string") {
      return params.year as DateStringFormat["year"];
    }
    return "YYYY";
  });

  const currMonthFormat = computed<DateStringFormat["month"]>(() => {
    if (isDefined(params.month) && typeof params.month === "string") {
      return params.month as DateStringFormat["month"];
    }
    return "MMMM";
  });

  const currWeekdayFormat = computed<DateStringFormat["weekDay"]>(() => {
    if (isDefined(params.weekDay) && typeof params.weekDay === "string") {
      return params.weekDay as DateStringFormat["weekDay"];
    }
    return "DDDD";
  });

  const calculatorMethod = computed<keyof typeof CalculationMethod>(() => {
    if (isDefined(params.method) && typeof params.method === "string") {
      return params.method as keyof typeof CalculationMethod;
    }
    return "Turkey";
  });

  const calculatorMadhab = computed<CalculatorMadhab>(() => {
    if (isDefined(params.madhab) && typeof params.madhab === "string") {
      return params.madhab as CalculatorMadhab;
    }
    return "shafi";
  });

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
  };
}
