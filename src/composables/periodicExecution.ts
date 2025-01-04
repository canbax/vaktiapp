/* eslint-disable @typescript-eslint/no-explicit-any */
import { onMounted, onUnmounted } from 'vue';

export function usePeriodicExecution(fn: () => void, interval: number) {
  let intervalId: any;
  onMounted(() => {
    intervalId = setInterval(fn, interval);
  });
  onUnmounted(() => {
    window.clearInterval(intervalId);
  });
}
