import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import { i18n } from "@/plugins/i18n";
import DailyPrayTimes from "../DailyPrayTimes.vue";

describe("DailyPrayTimes", () => {
  it("can render times data and remaining time", () => {
    const currTimes = [
      { name: "imsak", value: "05:42" },
      { name: "sabah", value: "07:07" },
      { name: "öğle", value: "12:37" },
      { name: "ikindi", value: "15:29" },
      { name: "akşam", value: "17:58" },
      { name: "yatsı", value: "19:16" },
    ];
    const wrapper = mount(DailyPrayTimes, {
      global: {
        plugins: [createVuetify(), createPinia(), i18n],
      },
      props: { isShowingToday: true, currTimes },
    });
    expect(wrapper.text()).toContain("ikindi");
    expect(wrapper.text()).toContain("remaining time");
  });
});
