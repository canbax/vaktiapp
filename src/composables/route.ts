import { readonly, ref, shallowRef, watch } from "vue";
import { useBrowserLocation } from "@vueuse/core";
import TimesPage from "@/pages/TimesPage.vue";
import TimesWidgetPage from "@/pages/TimesWidgetPage.vue";
import ReligiousDaysPageVue from "@/pages/ReligiousDaysPage.vue";
import SettingsPageVue from "@/pages/SettingsPage.vue";
import AboutPageVue from "@/pages/AboutPage.vue";
import NotFoundPageVue from "@/pages/NotFoundPage.vue";
import { PathMenuItem, RouteManager } from "@/types";

const currentView = shallowRef(null);
const currentPathMenuItem = shallowRef<string | null>(null);

export function useRoute(): RouteManager {
  const location = useBrowserLocation();
  const routePathToVueComponent = {
    "/": TimesPage,
    "": TimesPage,
    widget: TimesWidgetPage,
    times: TimesPage,
    sabbaticals: ReligiousDaysPageVue,
    settings: SettingsPageVue,
    about: AboutPageVue,
  };
  const pathMenuItems: readonly PathMenuItem[] = [
    {
      icon: "mdi-clock-time-four-outline",
      title: "times",
    },
    {
      icon: "mdi-calendar-month-outline",
      title: "sabbaticals",
    },
    {
      icon: "mdi-cog-outline",
      title: "settings",
    },
    {
      icon: "mdi-information-outline",
      title: "about",
    },
  ] as const;
  const isWidget = ref(false);

  watch(
    location,
    () => {
      setViewFromRoutePath(location.value.pathname?.replace("/", "") ?? "");
    },
    { immediate: true, deep: true }
  );

  function setViewFromRoutePath(path: string) {
    const pageToGo = routePathToVueComponent[path];
    if (!pageToGo) {
      currentView.value = NotFoundPageVue;
      currentPathMenuItem.value = null;
    } else {
      currentView.value = pageToGo;
      if (pageToGo === TimesPage) {
        currentPathMenuItem.value = "times";
      } else {
        currentPathMenuItem.value = path;
      }
    }
    isWidget.value = currentPathMenuItem.value === "widget";
  }

  function setViewFromPathMenuItem(item: PathMenuItem) {
    setViewFromRoutePath(item.title); // title is also route path
  }

  return {
    currentView,
    currentPathMenuItem,
    pathMenuItems,
    isWidget: readonly(isWidget),
    setViewFromPathMenuItem,
  };
}
