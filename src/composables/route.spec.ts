import { withSetup } from "@/util/test-utils";
import { useRoute } from "./route";
import { describe, it, expect } from "vitest";
import { RouteManager } from "@/types";
import TimesPage from "@/pages/TimesPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import ReligiousDaysPage from "@/pages/ReligiousDaysPage.vue";

describe("useRoute", () => {
  it("should open 'Times Page' by default", () => {
    const { result, app } = withSetup<RouteManager>(() => useRoute());
    expect(result.currentView.value).toStrictEqual(TimesPage);
    app.unmount();
  });

  it("Should redirect to 'Not Found' page for undefined paths ", () => {
    const { result, app } = withSetup<RouteManager>(() => useRoute());
    result.setViewFromPathMenuItem({ icon: "", title: "asd" });
    expect(result.currentView.value).toStrictEqual(NotFoundPage);
    app.unmount();
  });

  it("Should redirect to 'sabbaticals' page after setting view", () => {
    const { result, app } = withSetup<RouteManager>(() => useRoute());
    result.setViewFromPathMenuItem({ icon: "", title: "sabbaticals" });
    expect(result.currentView.value).toStrictEqual(ReligiousDaysPage);
    app.unmount();
  });
});
