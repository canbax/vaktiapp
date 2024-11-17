import { translate } from "@/util/i18n";
import { type App, type Plugin } from "vue";

export const i18n: Plugin = {
  install: (app: App): void => {
    app.config.globalProperties.$t = (key: string) => {
      return translate(key);
    };
  },
};
