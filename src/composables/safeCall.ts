import { ref } from 'vue';

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function useSafeCall<F extends Function>(fn: F) {
  const error = ref<string | undefined>(undefined);
  const loading = ref(false);

  async function execute(...args: any[]) {
    try {
      error.value = undefined;
      loading.value = true;
      await fn(...args);
    } catch (e) {
      error.value = '' + e;
    } finally {
      loading.value = false;
    }
  }

  return { error, loading, execute };
}
