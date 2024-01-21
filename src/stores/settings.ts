import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { Place, UserInterfaceLanguage } from "@/types";

export const useSettingsStore = defineStore("settings", () => {
  const addedPlaces = useLocalStorage<Place[]>("addedLocations", []);
  const currentPlace = useLocalStorage<Place | null>("currentPlace", null);
  const currentLanguage = useLocalStorage<UserInterfaceLanguage | null>(
    "currentLanguage",
    null
  );

  return { addedPlaces, currentPlace, currentLanguage };
});
