/* eslint-disable @typescript-eslint/no-explicit-any */
import { readonly, ref, shallowRef, watch } from 'vue';
import { useBrowserLocation } from '@vueuse/core';
import TimesPage from '@/pages/TimesPage.vue';
import TimesWidgetPage from '@/pages/TimesWidgetPage.vue';
import ReligiousDaysPageVue from '@/pages/ReligiousDaysPage.vue';
import SettingsPageVue from '@/pages/SettingsPage.vue';
import AboutPageVue from '@/pages/AboutPage.vue';
import PrivacyPageVue from '@/pages/PrivacyPage.vue';
import NotFoundPageVue from '@/pages/NotFoundPage.vue';
import type { PathMenuItem, RouteManager, SupportedLanguage } from '@/types';
import { useUrlParams } from '@/composables/urlParams';
import { useSettings } from '@/composables/settings';

const currentView = shallowRef<any>(null);
const currentPathMenuItem = shallowRef<string | null>(null);

const { ALL_LANGUAGES } = useSettings();

/**
 * Parses the path to extract language code and route path
 * @param path - The full path from URL (e.g., 'en/sabbaticals' or 'sabbaticals')
 * @returns Object containing languageCode and routePath
 */
export function parsePathWithLanguage(path: string): {
  languageCode: string | null;
  routePath: string;
} {
  const pathSegments = path.split('/').filter((segment) => segment.length > 0);

  if (pathSegments.length === 0) {
    return { languageCode: null, routePath: '' };
  }

  const lastSegment = pathSegments[pathSegments.length - 1];

  // Check if the first segment is a supported language code (2-letter code)
  if (lastSegment.length === 2) {
    if (ALL_LANGUAGES.find((lang) => lang.languageCode === lastSegment)) {
      const routePath = pathSegments.slice(0, -1).join('/') || '';
      return { languageCode: lastSegment, routePath };
    }
  }

  // No language code in path
  return { languageCode: null, routePath: path };
}

export function useRoute(): RouteManager {
  const location = useBrowserLocation();
  const { applyUrlParamsToSettings } = useUrlParams();
  const { getLanguageFromCode, currentLanguage } = useSettings();

  const routePathToVueComponent: Record<string, any> = {
    '/': TimesPage,
    '': TimesPage,
    widget: TimesWidgetPage,
    times: TimesPage,
    share: TimesPage,
    sabbaticals: ReligiousDaysPageVue,
    settings: SettingsPageVue,
    about: AboutPageVue,
    privacy: PrivacyPageVue,
  };
  const pathMenuItems: readonly PathMenuItem[] = [
    {
      icon: 'mdi-clock-time-four-outline',
      title: 'times',
    },
    {
      icon: 'mdi-calendar-month-outline',
      title: 'sabbaticals',
    },
    {
      icon: 'mdi-cog-outline',
      title: 'settings',
    },
    {
      icon: 'mdi-information-outline',
      title: 'about',
    },
  ] as const;
  const isWidget = ref(false);

  watch(
    () => location.value.pathname,
    async () => {
      const path = location.value.pathname?.replace('/', '') ?? '';
      await setViewFromRoutePath(path);
    },
    { immediate: true, deep: true },
  );

  async function setViewFromRoutePath(path: string) {
    const { languageCode, routePath } = parsePathWithLanguage(path);

    // Set language if a language code was found in the URL
    if (languageCode) {
      const language = getLanguageFromCode(languageCode as SupportedLanguage);
      currentLanguage.value = language;
    }

    if (routePath === 'share') {
      await applyUrlParamsToSettings();
      location.value.href = 'times';
      return;
    }

    const pageToGo = routePathToVueComponent[routePath];
    if (!pageToGo) {
      currentView.value = NotFoundPageVue;
      currentPathMenuItem.value = null;
    } else {
      currentView.value = pageToGo;
      if (pageToGo === TimesPage) {
        currentPathMenuItem.value = 'times';
      } else {
        currentPathMenuItem.value = routePath;
      }
    }
    isWidget.value = currentPathMenuItem.value === 'widget';
  }

  async function setViewFromPathMenuItem(item: PathMenuItem) {
    await setViewFromRoutePath(item.title); // title is also route path
  }

  return {
    currentView,
    currentPathMenuItem,
    pathMenuItems,
    isWidget: readonly(isWidget),
    setViewFromPathMenuItem,
  };
}
