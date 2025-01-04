import { useStorage } from '@vueuse/core';

export function useUIState() {
  const isSideBarOpen = useStorage('isSidebarOpen', true);
  const isShowHijriDate = useStorage('isShowHijriDate', true);
  const currentZoom = useStorage('currentZoom', 1);
  const settingsTab = useStorage('settingsTab', '1');

  return { isSideBarOpen, currentZoom, isShowHijriDate, settingsTab };
}
