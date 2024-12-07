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

export function translate(key: string) {
  return stringsInLanguages[currentLanguage.value?.languageCode ?? "en"][key];
}
