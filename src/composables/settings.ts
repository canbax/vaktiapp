import { useStorage } from "@vueuse/core";
import { CalculationMethod } from "adhan";
import {
  DateStringFormat,
  GenericPlace,
  RemainingTimeFormat,
  UserInterfaceLanguage,
} from "@/types";

export function useSettings() {
  const currentPlace = useStorage<GenericPlace | null>(
    "currentPlace",
    null,
    localStorage,
    {
      serializer: {
        read: (v: any) => (v ? JSON.parse(v) : null),
        write: (v: any) => JSON.stringify(v),
      },
    }
  );

  const currentUITheme = useStorage<"light" | "dark">(
    "currentUITheme",
    "light"
  );

  const currentDate = useStorage<string | null>("currentDate", null);

  const currentTimeFormat = useStorage<RemainingTimeFormat>(
    "currentTimeFormat",
    "XX:YY:ZZ"
  );

  const currYearFormat = useStorage<DateStringFormat["year"]>(
    "currYearFormat",
    "YYYY"
  );

  const currMonthFormat = useStorage<DateStringFormat["month"]>(
    "currMonthFormat",
    "MMMM"
  );

  const calculatorMethod = useStorage<keyof typeof CalculationMethod>(
    "calculatorMethod",
    "Turkey"
  );

  const calculatorMadhab = useStorage<"shafi" | "hanafi">(
    "calculatorMadhab",
    "shafi"
  );

  const currWeekdayFormat = useStorage<DateStringFormat["weekDay"]>(
    "currWeekdayFormat",
    "DDDD",
    localStorage
  );

  const currentLanguage = useStorage<UserInterfaceLanguage | null>(
    "currentLanguage",
    null,
    localStorage,
    {
      serializer: {
        read: (v: any) => (v ? JSON.parse(v) : null),
        write: (v: any) => JSON.stringify(v),
      },
    }
  );

  const selectedPlaces = useStorage<Map<number, GenericPlace>>(
    "selectedPlaces",
    new Map<number, GenericPlace>(),
    localStorage,
    {
      serializer: {
        read: (v: string) =>
          v
            ? new Map<number, GenericPlace>(
                JSON.parse(v).map((x: GenericPlace) => [x.id, x])
              )
            : new Map<number, GenericPlace>(),
        write: (v: Map<number, GenericPlace>) =>
          JSON.stringify(Array.from(v.values())),
      },
    }
  );

  return {
    currentPlace,
    currentLanguage,
    selectedPlaces,
    currentUITheme,
    currentTimeFormat,
    currYearFormat,
    currMonthFormat,
    currWeekdayFormat,
    currentDate,
    calculatorMethod,
    calculatorMadhab,
  };
}
