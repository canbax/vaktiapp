import type { Ref } from 'vue';
import { unref } from 'vue';

export function triggerClick(elem: Ref<HTMLElement> | HTMLElement | Ref<null>) {
  if (!elem) return;
  const el = unref(elem);
  // Manually trigger ripple effect
  if (!el) return;
  setTimeout(() => {
    // Dispatch the event to trigger the ripple
    el.dispatchEvent(
      new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
      }),
    );
    setTimeout(() => {
      el.dispatchEvent(
        new MouseEvent('mouseup', {
          view: window,
          bubbles: true,
          cancelable: true,
        }),
      );
    }, 300);
  }, 500);
}
