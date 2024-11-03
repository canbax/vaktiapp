import { useStorage } from "@vueuse/core";

export function useUIState() {
  const isSideBarOpen = useStorage("isSidebarOpen", true);

  return { isSideBarOpen };
}
