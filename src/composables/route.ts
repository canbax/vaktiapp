import { computed } from "vue";
import { useBrowserLocation } from "@vueuse/core";
import TimesPage from "@/pages/TimesPage.vue";
import AddNewLocationPageVue from "@/pages/AddNewLocationPage.vue";
import ReligiousDaysPageVue from "@/pages/ReligiousDaysPage.vue";
import SettingsPageVue from "@/pages/SettingsPage.vue";
import AboutPageVue from "@/pages/AboutPage.vue";
import NotFoundPageVue from "@/pages/NotFoundPage.vue";

export function useRoute() {
  const location = useBrowserLocation();
  const routePathToVueComponent = {
    "": TimesPage,
    times: TimesPage,
    addNewLocation: AddNewLocationPageVue,
    sabbaticals: ReligiousDaysPageVue,
    settings: SettingsPageVue,
    about: AboutPageVue,
  };

  const currentView = computed(() => {
    const currentPath = location.value.href ?? "";
    const arr = currentPath.split("/");
    const routePath = arr[arr.length - 1];

    const pageToGo = routePathToVueComponent[routePath];
    if (!pageToGo) return NotFoundPageVue;
    return pageToGo;
  });

  const menuItems: {
    icon: string;
    title: string;
  }[] = [
    {
      icon: "mdi-clock-time-four-outline",
      title: "times",
    },
    {
      icon: "mdi-map-marker-plus",
      title: "addNewLocation",
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
  ];

  return { currentView, menuItems };
}
