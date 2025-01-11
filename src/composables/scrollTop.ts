import { onMounted } from 'vue';
import { useWindowScroll } from '@vueuse/core';

export function useScrollTop() {
  const { y } = useWindowScroll({ behavior: 'smooth' });
  onMounted(() => {
    y.value = 0;
  });
}
