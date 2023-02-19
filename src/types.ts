// Works correctly
export {};

declare module "vue" {
  interface ComponentCustomProperties {
    $t: (key: string) => string; // see plugins/i18n
  }
}
