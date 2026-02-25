import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ApiClient } from './ApiClient';
import type { PlaceMatchWithCountry, PlaceWithCountry } from './types';

// Mock data
const mockSearchPlacesResponse: PlaceMatchWithCountry[] = [
  {
    id: 1,
    name: 'Istanbul',
    latitude: 41.0082,
    longitude: 28.9784,
    countryCode: 'TR',
    stateName: 'Istanbul',
    alternativeNames: ['Konstantinopolis'],
    country: 'Turkey',
    matchingString: 'Istanbul',
    isMatchingAlternativeName: false,
    editDistance: 0,
  },
  {
    id: 2,
    name: 'Ankara',
    latitude: 39.9334,
    longitude: 32.8597,
    countryCode: 'TR',
    stateName: 'Ankara',
    alternativeNames: ['Angora'],
    country: 'Turkey',
    matchingString: 'Ankara',
    isMatchingAlternativeName: false,
    editDistance: 0,
  },
];

const mockNearByPlacesResponse: PlaceWithCountry[] = [
  {
    id: 3,
    name: 'Besiktas',
    latitude: 41.0422,
    longitude: 29.0031,
    countryCode: 'TR',
    stateName: 'Istanbul',
    alternativeNames: [],
    country: 'Turkey',
  },
  {
    id: 4,
    name: 'Kadikoy',
    latitude: 40.9838,
    longitude: 29.0365,
    countryCode: 'TR',
    stateName: 'Istanbul',
    alternativeNames: [],
    country: 'Turkey',
  },
];

const mockPlaceByIdResponse: PlaceWithCountry = {
  id: 1,
  name: 'Istanbul',
  latitude: 41.0082,
  longitude: 28.9784,
  countryCode: 'TR',
  stateName: 'Istanbul',
  alternativeNames: ['Konstantinopolis'],
  country: 'Turkey',
};

// Mock response type to avoid 'any' usage
interface MockFetchResponse {
  ok: boolean;
  json: () => Promise<unknown>;
}

describe('API Client', () => {
  let api: ApiClient;
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    api = new ApiClient();
    // Mock the global fetch function
    fetchSpy = vi.fn();
    global.fetch = fetchSpy;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create an API client with correct base URL', () => {
      expect(api).toBeDefined();
      expect(api['_baseUrl']).toBe('https://vakti-api.vercel.app/api/');
    });
  });

  describe('searchPlaces', () => {
    it('should search places with all parameters', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockSearchPlacesResponse),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.searchPlaces('Istanbul', 41.0082, 28.9784, 'en', 'TR');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/searchPlaces?q=Istanbul&lat=41.0082&lng=28.9784&lang=en&countryCode=TR',
        { method: 'GET' },
      );
      expect(result).toEqual(mockSearchPlacesResponse);
    });

    it('should search places with minimal parameters', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockSearchPlacesResponse),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.searchPlaces('Istanbul');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/searchPlaces?q=Istanbul&lat=undefined&lng=undefined&lang=undefined&countryCode=',
        { method: 'GET' },
      );
      expect(result).toEqual(mockSearchPlacesResponse);
    });

    it('should handle empty search term', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.searchPlaces('');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/searchPlaces?q=&lat=undefined&lng=undefined&lang=undefined&countryCode=',
        { method: 'GET' },
      );
      expect(result).toEqual([]);
    });

    it('should handle null coordinates', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockSearchPlacesResponse),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.searchPlaces('Istanbul', null, null, 'tr');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/searchPlaces?q=Istanbul&lat=null&lng=null&lang=tr&countryCode=',
        { method: 'GET' },
      );
      expect(result).toEqual(mockSearchPlacesResponse);
    });

    it('should handle fetch errors', async () => {
      fetchSpy.mockRejectedValue(new Error('Network error'));

      await expect(api.searchPlaces('Istanbul')).rejects.toThrow('Network error');
    });

    it('should handle JSON parsing errors', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      await expect(api.searchPlaces('Istanbul')).rejects.toThrow('Invalid JSON');
    });
  });

  describe('nearByPlaces', () => {
    it('should get nearby places with all parameters', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockNearByPlacesResponse),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.nearByPlaces(41.0082, 28.9784, 'en');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/nearByPlaces?lat=41.0082&lng=28.9784&lang=en',
        { method: 'GET' },
      );
      expect(result).toEqual(mockNearByPlacesResponse);
    });

    it('should get nearby places without language parameter', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockNearByPlacesResponse),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.nearByPlaces(41.0082, 28.9784);

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/nearByPlaces?lat=41.0082&lng=28.9784&lang=undefined',
        { method: 'GET' },
      );
      expect(result).toEqual(mockNearByPlacesResponse);
    });

    it('should handle negative coordinates', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.nearByPlaces(-41.0082, -28.9784, 'es');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/nearByPlaces?lat=-41.0082&lng=-28.9784&lang=es',
        { method: 'GET' },
      );
      expect(result).toEqual([]);
    });

    it('should handle fetch errors', async () => {
      fetchSpy.mockRejectedValue(new Error('Network error'));

      await expect(api.nearByPlaces(41.0082, 28.9784)).rejects.toThrow('Network error');
    });

    it('should handle JSON parsing errors', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      await expect(api.nearByPlaces(41.0082, 28.9784)).rejects.toThrow('Invalid JSON');
    });
  });

  describe('placeById', () => {
    it('should get place by string ID with language', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockPlaceByIdResponse),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.placeById('123', 'tr');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/placeById?id=123&lang=tr',
        { method: 'GET' },
      );
      expect(result).toEqual(mockPlaceByIdResponse);
    });

    it('should get place by numeric ID without language', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockPlaceByIdResponse),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.placeById(456);

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/placeById?id=456&lang=undefined',
        { method: 'GET' },
      );
      expect(result).toEqual(mockPlaceByIdResponse);
    });

    it('should handle zero ID', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(null),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.placeById(0, 'en');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/placeById?id=0&lang=en',
        {
          method: 'GET',
        },
      );
      expect(result).toBeNull();
    });

    it('should handle empty string ID', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(null),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      const result = await api.placeById('');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/placeById?id=&lang=undefined',
        { method: 'GET' },
      );
      expect(result).toBeNull();
    });

    it('should handle fetch errors', async () => {
      fetchSpy.mockRejectedValue(new Error('Network error'));

      await expect(api.placeById('123')).rejects.toThrow('Network error');
    });

    it('should handle JSON parsing errors', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      await expect(api.placeById('123')).rejects.toThrow('Invalid JSON');
    });
  });

  describe('URL construction', () => {
    it('should construct searchPlaces URL correctly with special characters', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      await api.searchPlaces('İstanbul Beşiktaş', 41.0082, 28.9784, 'tr', 'TR');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/searchPlaces?q=İstanbul Beşiktaş&lat=41.0082&lng=28.9784&lang=tr&countryCode=TR',
        { method: 'GET' },
      );
    });

    it('should handle undefined search term', async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      };
      fetchSpy.mockResolvedValue(mockResponse);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await api.searchPlaces(undefined as any);

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://vakti-api.vercel.app/api/searchPlaces?q=&lat=undefined&lng=undefined&lang=undefined&countryCode=',
        { method: 'GET' },
      );
    });
  });
});
