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
import type { SupportedLanguage, UserInterfaceLanguage } from "@/types";
import { useSettings } from "@/composables/settings";
const { currentLanguage } = useSettings();

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

/**
 * returns 2 letter language code ('en', 'de', 'tr', ...) of the browser. By default returns 'en'
 */
export function getDefaultLangCode(): SupportedLanguage {
  const userLang = navigator.language;
  if (userLang && typeof userLang === "string" && userLang.includes("-")) {
    const langCode = userLang.split("-")[0] as SupportedLanguage;
    if (stringsInLanguages[langCode]) {
      return langCode;
    } else {
      console.warn(`${langCode} is not a supported language`);
    }
  } else {
    console.warn(`${userLang} is not a valid language indicator`);
  }
  return "en";
}

export function translate(key: string) {
  return stringsInLanguages[
    currentLanguage.value?.languageCode ?? getDefaultLangCode()
  ][key];
}

export const ALL_LANGUAGES: UserInterfaceLanguage[] = [
  { text: "Türkçe", languageCode: "tr" },
  { text: "English", languageCode: "en" },
  { text: "Pусский", languageCode: "ru" },
  { text: "Española", languageCode: "es" },
  { text: "فارسی", languageCode: "fa" },
  { text: "Français", languageCode: "fr" },
  { text: "Deutsch", languageCode: "de" },
  { text: "Chinese", languageCode: "zh" },
  { text: "عربى", languageCode: "ar" },
  { text: "Indonesia", languageCode: "id" },
  { text: "Italian", languageCode: "it" },
  { text: "Kazakh", languageCode: "kk" },
  { text: "Korean", languageCode: "ko" },
  { text: "Kyrgyz", languageCode: "ky" },
  { text: "Malay", languageCode: "ms" },
];
