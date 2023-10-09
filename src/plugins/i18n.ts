import { getDefaultLangCode, translate } from "@/util/i18n";
import { ref, type App, type Plugin } from "vue";

export const i18n: Plugin = {
  install: (app: App): void => {
    const currentLocale = ref(getDefaultLangCode());
    app.config.globalProperties.$t = (key: string) => {
      return translate(key);
    };
    app.provide("currentLocale", currentLocale);
  },
};
