export type SupportedLanguage =
  | "ar"
  | "az"
  | "de"
  | "en"
  | "es"
  | "fa"
  | "fr"
  | "id"
  | "it"
  | "kk"
  | "ko"
  | "ky"
  | "ms"
  | "ru"
  | "tr"
  | "zh";

declare module "vue" {
  interface ComponentCustomProperties {
    $t: (key: string) => string; // see plugins/i18n
  }
}
