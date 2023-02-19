import type { App, Plugin } from "vue";
import { ar } from "@/locales/ar";
import { az } from "@/locales/az";
import { de } from "@/locales/de";
import { en } from "@/locales/en";
import { es } from "@/locales/es";
import { fa } from "@/locales/fa";
import { fr } from "@/locales/fr";
import { id } from "@/locales/id";
import { it } from "@/locales/it";
import { kk } from "@/locales/kk";
import { ko } from "@/locales/ko";
import { ky } from "@/locales/ky";
import { ms } from "@/locales/ms";
import { ru } from "@/locales/ru";
import { tr } from "@/locales/tr";
import { zh } from "@/locales/zh";

const stringsInLanguages: Record<string, Record<string, string>> = {
  ar,
  az,
  de,
  en,
  es,
  fa,
  fr,
  id,
  it,
  kk,
  ko,
  ky,
  ms,
  ru,
  tr,
  zh,
};

export const i18n: Plugin = {
  install: (app: App): void => {
    app.config.globalProperties.$currentLocale = getDefaultLangCode();
    app.config.globalProperties.$t = (key: string) => {
      const lang = app.config.globalProperties.$currentLocale;
      return stringsInLanguages[lang][key];
    };
  },
};

/**
 * returns 2 letter language code ('en', 'de', 'tr', ...) of the browser. By default returns 'en'
 */
function getDefaultLangCode(): string {
  const userLang = navigator.language;
  if (userLang && typeof userLang === "string" && userLang.includes("-")) {
    const langCode = userLang.split("-")[0];
    if (stringsInLanguages[langCode]) {
      return langCode;
    } else {
      console.log(`${langCode} is not a supported language`);
    }
  } else {
    console.log(`${userLang} is not a valid language indicator`);
  }
  return "en";
}
