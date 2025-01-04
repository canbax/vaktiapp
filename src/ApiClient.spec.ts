import { describe, it, expect } from 'vitest';
import { ApiClient } from './ApiClient';

describe('API Client', () => {
  const api = new ApiClient();

  describe('searchPlaces', () => {
    it('should create an API client', () => {
      expect(api).toBeDefined();
    });
    // it("should search places by search query, GPS coordinates and language", async () => {
    //   const placeList = await api.searchPlaces(
    //     "anka",
    //     39.91987,
    //     32.85427,
    //     "tr"
    //   );
    //   expect(placeList.length).toBeGreaterThan(3);
    //   expect(placeList[0]).toHaveProperty("name", "Ankara");
    //   expect(placeList[0]).toHaveProperty("id", 311034);
    //   expect(placeList[0]).toHaveProperty("countryCode", "tr");
    //   expect(placeList[0]).toHaveProperty("country", "Türkiye");
    //   expect(placeList[0]).toHaveProperty("stateName", "Ankara");
    //   expect(placeList[0]).toHaveProperty("latitude", 39.9306);
    //   expect(placeList[0]).toHaveProperty("longitude", 32.7439);
    // });

    // it("should search places by only search query", async () => {
    //   const placeList = await api.searchPlaces("ankar");
    //   expect(placeList.length).toBeGreaterThan(3);
    //   expect(placeList[0]).toHaveProperty("name", "Ankara");
    //   expect(placeList[0]).toHaveProperty("country", "Turkiye");
    //   expect(placeList[0]).toHaveProperty("id", 311034);
    //   expect(placeList[0]).toHaveProperty("countryCode", "tr");
    //   expect(placeList[0]).toHaveProperty("stateName", "Ankara");
    //   expect(placeList[0]).toHaveProperty("latitude", 39.9306);
    //   expect(placeList[0]).toHaveProperty("longitude", 32.7439);
    // });
  });
});
