import { Cities, Country, Place, Regions, TimesForPlace } from "@/types";

export class ApiClient {
  private _baseUrl: string;

  constructor() {
    this._baseUrl = "https://namaz-vakti.vercel.app/api/";
    // this._url = 'http://localhost:3000/';
  }

  async countries(): Promise<Country[]> {
    const url = `${this._baseUrl}countries`;
    const response = await fetch(url, { method: "GET" });
    return response.json() as Promise<Country[]>;
  }

  async regions(country: string): Promise<Regions> {
    const url = `${this._baseUrl}regions?country=${country}`;
    const response = await fetch(url, { method: "GET" });
    return response.json() as Promise<Regions>;
  }

  async cities(country: string, region: string): Promise<Cities> {
    const url = `${this._baseUrl}cities?country=${country}&region=${region}`;
    const response = await fetch(url, { method: "GET" });
    return response.json() as Promise<Cities>;
  }

  async coordinates(
    country: string,
    region: string,
    city: string
  ): Promise<Place | null> {
    const url = `${this._baseUrl}coordinates?country=${country}&region=${region}&city=${city}`;
    const response = await fetch(url, { method: "GET" });
    return response.json() as Promise<Place | null>;
  }

  async place(lat: string, lng: string): Promise<Place | null> {
    const url = `${this._baseUrl}place?lat=${lat}&lng=${lng}`;
    const response = await fetch(url, { method: "GET" });
    return response.json() as Promise<Place | null>;
  }

  async timesFromCoordinates(
    lat: string,
    lng: string,
    date: Date | string,
    days: number,
    timezoneOffset: number,
    calculateMethod: string = "Turkey"
  ): Promise<TimesForPlace> {
    const url = `${this._baseUrl}timesFromCoordinates?lat=${lat}&lng=${lng}&date=${date}&days=${days}&timezoneOffset=${timezoneOffset}&calculateMethod=${calculateMethod}`;
    const response = await fetch(url, { method: "GET" });
    return response.json() as Promise<TimesForPlace>;
  }

  async timesFromPlace(
    country: string,
    region: string,
    city: string,
    date: Date | string,
    days: number,
    timezoneOffset: number,
    calculateMethod: string = "Turkey"
  ): Promise<TimesForPlace> {
    const url = `${this._baseUrl}timesFromPlace?country=${country}&region=${region}&city=${city}&date=${date}&days=${days}&timezoneOffset=${timezoneOffset}&calculateMethod=${calculateMethod}`;
    const response = await fetch(url, { method: "GET" });
    return response.json() as Promise<TimesForPlace>;
  }
}
