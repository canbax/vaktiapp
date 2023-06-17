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

export type RemainingTimeFormat =
  | "XX:YY:ZZ"
  | "XX:YY"
  | `X hour Y minute Z second`
  | `X hour Y minute`;

declare module "vue" {
  interface ComponentCustomProperties {
    $t: (key: string) => string; // see plugins/i18n
  }
}
