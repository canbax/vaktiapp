import { onMounted, onUnmounted } from "vue";

export function usePeriodicExecution(fn: () => void, interval: number) {
  let intervalId: NodeJS.Timeout;
  onMounted(() => {
    intervalId = setInterval(fn, interval);
  });
  onUnmounted(() => {
    window.clearInterval(intervalId);
  });
}
