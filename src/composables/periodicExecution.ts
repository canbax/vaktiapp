import { onMounted, onUnmounted } from "vue";

export function usePeriodicExecution(fn: () => void, interval: number) {
  let intervalId: number | NodeJS.Timer;
  onMounted(() => {
    intervalId = setInterval(fn, interval);
  });
  onUnmounted(() => {
    window.clearInterval(intervalId);
  });
}
