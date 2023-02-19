import { ref, type App, type Plugin } from "vue";
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
import type { SupportedLanguage } from "@/types";

const stringsInLanguages: Record<SupportedLanguage, Record<string, string>> = {
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
    const currentLocale = ref(getDefaultLangCode());
    app.config.globalProperties.$t = (key: string) => {
      return stringsInLanguages[currentLocale.value][key];
    };
    app.provide("currentLocale", currentLocale);
  },
};

/**
 * returns 2 letter language code ('en', 'de', 'tr', ...) of the browser. By default returns 'en'
 */
function getDefaultLangCode(): SupportedLanguage {
  const userLang = navigator.language;
  if (userLang && typeof userLang === "string" && userLang.includes("-")) {
    const langCode = userLang.split("-")[0] as SupportedLanguage;
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
