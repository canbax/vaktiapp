import { useStorage } from "@vueuse/core";
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
    "light",
    localStorage
  );

  const currentTimeFormat = useStorage<RemainingTimeFormat>(
    "currentTimeFormat",
    "XX:YY:ZZ",
    localStorage
  );

  const currYearFormat = useStorage<DateStringFormat["year"]>(
    "currYearFormat",
    "YYYY",
    localStorage
  );

  const currMonthFormat = useStorage<DateStringFormat["month"]>(
    "currMonthFormat",
    "MMMM",
    localStorage
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
  };
}
