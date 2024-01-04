import { describe, it, expect } from "vitest";
import { ApiClient } from "./ApiClient";

describe("API Client", () => {
  const api = new ApiClient();

  it("should get a list of countries", async () => {
    const countries = await api.countries();
    expect(countries).toHaveLength(249);
    expect(countries[0]).toStrictEqual({ code: "AF", name: "Afghanistan" });
  });

  it("should get a list of regions", async () => {
    const regions = await api.regions("Turkey");
    expect(regions).toHaveLength(81);
    expect(regions[6]).toStrictEqual("Ankara");
  });

  it("should get a list of cities", async () => {
    const cities = await api.cities("United States of America", "New York");
    expect(cities).toHaveLength(1031);
    expect(cities[630]).toStrictEqual("Newburgh");
  });

  it("should get times from GPS coordinates", async () => {
    const timesData = await api.timesFromCoordinates(
      "39.91987",
      "32.85427",
      "2023-10-29",
      3,
      180
    );
    expect(timesData.place).toStrictEqual({
      countryCode: "TR",
      country: "Turkey",
      region: "Ankara",
      city: "Ankara",
      latitude: 39.91987,
      longitude: 32.85427,
    });
    expect(Object.keys(timesData.times)).toHaveLength(3);
    expect(timesData.times["2023-10-29"]).toStrictEqual([
      "05:42",
      "07:07",
      "12:37",
      "15:29",
      "17:58",
      "19:16",
    ]);
  });

  it("should get times from place", async () => {
    const timesData = await api.timesFromPlace(
      "Turkey",
      "Ankara",
      "Ankara",
      "2023-10-29",
      3,
      180
    );
    expect(timesData.place).toStrictEqual({
      countryCode: "TR",
      country: "Turkey",
      region: "Ankara",
      city: "Ankara",
      latitude: 39.91987,
      longitude: 32.85427,
    });
    expect(Object.keys(timesData.times)).toHaveLength(3);
    expect(timesData.times["2023-10-29"]).toStrictEqual([
      "05:42",
      "07:07",
      "12:37",
      "15:29",
      "17:58",
      "19:16",
    ]);
  });
});
