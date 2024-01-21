import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useSettingsStore = defineStore("settings", () => {
  const isSideBarOpen = useLocalStorage("isSidebarOpen", false);

  return { isSideBarOpen };
});
