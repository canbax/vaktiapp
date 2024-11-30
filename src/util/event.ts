import { Ref, unref } from "vue";

export function triggerClick(elem: Ref<HTMLElement> | HTMLElement) {
  const el = unref(elem);
  // Manually trigger ripple effect
  if (el) {
    setTimeout(() => {
      // Dispatch the event to trigger the ripple
      el.dispatchEvent(
        new MouseEvent("mousedown", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
      setTimeout(() => {
        el.dispatchEvent(
          new MouseEvent("mouseup", {
            view: window,
            bubbles: true,
            cancelable: true,
          })
        );
      }, 300);
    }, 500);
  }
}
