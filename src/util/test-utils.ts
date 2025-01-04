import { i18n } from '@/plugins/i18n';
import type { App } from 'vue';
import { createApp } from 'vue';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function withSetup<ResultType>(composable: any): {
  result: ResultType | undefined;
  app: App;
} {
  let result = undefined;
  const app = createApp({
    setup() {
      result = composable();
      // suppress missing template warning
      return () => {};
    },
  });
  app.use(i18n);
  app.mount(document.createElement('div'));
  // return the result and the app instance
  // for testing provide / unmount
  return { result, app };
}
