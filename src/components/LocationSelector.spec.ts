import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import { i18n } from '@/plugins/i18n';
import LocationSelector from './LocationSelector.vue';
import type { PlaceWithCountry } from '../types';

// Mock the ApiClient
vi.mock('../ApiClient', () => ({
  ApiClient: vi.fn().mockImplementation(() => ({
    searchPlaces: vi.fn().mockResolvedValue([]),
    nearByPlaces: vi.fn().mockResolvedValue([]),
  })),
}));

// Mock composables with simple return values
vi.mock('../composables/coordinates', () => ({
  useCoordinates: vi.fn(() => ({
    error: { value: null },
    getGPS: vi.fn().mockResolvedValue(undefined),
    lastGPS: { value: { latitude: 41.0082, longitude: 28.9784 } },
  })),
}));

vi.mock('../composables/safeCall', () => ({
  useSafeCall: vi.fn((fn) => ({
    loading: { value: false },
    error: { value: null },
    execute: fn,
  })),
}));

vi.mock('../composables/settings', () => ({
  useSettings: vi.fn(() => ({
    currentLanguage: { value: { languageCode: 'en' } },
    selectedPlaces: { value: new Map() },
    currentCountry: { value: 'US' },
  })),
}));

// Mock debounce function
vi.mock('@vueuse/core', async () => {
  const actual = await vi.importActual('@vueuse/core');
  return {
    ...actual,
    useDebounceFn: vi.fn((fn) => fn),
    isDefined: vi.fn((value) => value !== undefined && value !== null),
  };
});

describe('LocationSelector', () => {
  let wrapper: ReturnType<typeof mount>;
  const vuetify = createVuetify();
  const pinia = createPinia();

  // Mock place data
  const mockPlace: PlaceWithCountry = {
    id: 1,
    name: 'Istanbul',
    latitude: 41.0082,
    longitude: 28.9784,
    countryCode: 'TR',
    stateName: 'Istanbul',
    alternativeNames: ['Konstantinopolis'],
    country: 'Turkey',
  };

  beforeEach(() => {
    wrapper = mount(LocationSelector, {
      global: {
        plugins: [vuetify, pinia, i18n],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render autocomplete component', () => {
      const autocomplete = wrapper.find('[data-testid="search-place"]');
      expect(autocomplete.exists()).toBe(true);
    });

    it('should render GPS button', () => {
      const gpsButton = wrapper.findComponent({ name: 'VBtn' });
      expect(gpsButton.exists()).toBe(true);
    });
  });

  describe('Focus Retention on Delete', () => {
    it('should emit model value when place is selected', async () => {
      // Simulate place selection
      await wrapper
        .findComponent({ name: 'VAutocomplete' })
        .vm.$emit('update:modelValue', mockPlace);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([mockPlace]);
    });

    it('should only blur autocomplete when valid place is selected, not when cleared', () => {
      // Access the component instance and test the onPlaceSelected logic directly
      const componentInstance = wrapper.vm as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      // Mock the blur method
      const blurSpy = vi.fn();
      componentInstance.autoCompleteRef = { blur: blurSpy };

      // Test 1: Select a valid place - should blur
      componentInstance.onPlaceSelected(mockPlace);
      expect(blurSpy).toHaveBeenCalledTimes(1);

      // Test 2: Clear the place (null) - should NOT blur
      blurSpy.mockClear();
      componentInstance.onPlaceSelected(null);
      expect(blurSpy).not.toHaveBeenCalled();

      // Test 3: Clear with undefined - should NOT blur
      componentInstance.onPlaceSelected(undefined);
      expect(blurSpy).not.toHaveBeenCalled();

      // Test 4: Select another valid place - should blur again
      componentInstance.onPlaceSelected(mockPlace);
      expect(blurSpy).toHaveBeenCalledTimes(1);
    });
  });
});
