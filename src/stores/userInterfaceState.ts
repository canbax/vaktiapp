import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useUIState = defineStore("settings", () => {
  const isSideBarOpen = useLocalStorage("isSidebarOpen", false);

  return { isSideBarOpen };
});
