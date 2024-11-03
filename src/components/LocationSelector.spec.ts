import { describe, it, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import { i18n } from "@/plugins/i18n";
import LocationSelector from "./LocationSelector.vue";
import { GenericPlace, UserInterfaceLanguage } from "@/types";
import { ref } from "vue";

const currentPlace = ref<GenericPlace | null>(null);
const selectedPlaces = ref<Map<number, GenericPlace>>(
  new Map<number, GenericPlace>()
);
const currentLanguage = ref<UserInterfaceLanguage | null>(null);

vi.mock("@/composables/settings", () => ({
  useSettings: () => ({ currentPlace, selectedPlaces, currentLanguage }),
}));

describe("LocationSelector", () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it("can render times data", () => {
    // currentPlace.value = {
    //   id: 1,
    //   name: "Istanbul",
    //   latitude: 41.0082,
    //   longitude: 28.9784,
    //   countryCode: "TR",
    //   stateName: "Istanbul",
    //   alternativeNames: ["Constantinople", "Byzantium"],
    //   country: "Turkey",
    //   // Fields specific to PlaceMatchWithCountry
    //   matchingString: "istanbul",
    //   isMatchingAlternativeName: true,
    //   editDistance: 1,
    // };
    mount(LocationSelector, {
      global: {
        plugins: [createVuetify(), createPinia(), i18n],
        provide: {},
      },
    });

    // console.log(
    //   "exists: ",
    //   wrapper.find('[test-id="location-selector-dialog"]').exists()
    // );
    // console.log(wrapper.html());
  });
});
