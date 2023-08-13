// test-utils.js
import { i18n } from "@/plugins/i18n";
import { App, createApp } from "vue";

export function withSetup<ResultType>(composable): {
  result: ResultType;
  app: App;
} {
  let result;
  const app = createApp({
    setup() {
      result = composable();
      // suppress missing template warning
      return () => {};
    },
  });
  app.use(i18n);
  app.mount(document.createElement("div"));
  // return the result and the app instance
  // for testing provide / unmount
  return { result, app };
}
