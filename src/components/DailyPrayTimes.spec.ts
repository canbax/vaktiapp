import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import { i18n } from "@/plugins/i18n";
import DailyPrayTimes from "./DailyPrayTimes.vue";

describe("DailyPrayTimes", () => {
  it("can render times data and remaining time", () => {
    const currTimes = ["05:42", "07:07", "12:37", "15:29", "17:58", "19:16"];
    const wrapper = mount(DailyPrayTimes, {
      global: {
        plugins: [createVuetify(), createPinia(), i18n],
      },
      props: { isShowingToday: true, currTimes },
    });
    const renderedText = wrapper.text();
    for (const t of currTimes) {
      expect(renderedText).toContain(t);
    }

    expect(wrapper.text()).toContain("remaining time");
  });
});
