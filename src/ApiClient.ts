import { PlaceMatchWithCountry, PlaceWithCountry } from "@/types";

export class ApiClient {
  private _baseUrl: string;

  constructor() {
    // this._baseUrl = "https://namaz-vakti.vercel.app/api/";
    this._baseUrl = "http://localhost:3000/api/";
  }

  async searchPlaces(
    searchTerm: string,
    lat?: number,
    lng?: number,
    lang?: string
  ) {
    const q = searchTerm ?? "";
    const url = `${this._baseUrl}searchPlaces?q=${q}&lat=${lat}&lng=${lng}&lang=${lang}`;
    const response = await fetch(url, { method: "GET" });
    return response.json() as Promise<PlaceMatchWithCountry[]>;
  }

  async nearByPlaces(lat: number, lng: number, lang?: string) {
    const url = `${this._baseUrl}nearByPlaces?lat=${lat}&lng=${lng}&lang=${lang}`;
    const response = await fetch(url, { method: "GET" });
    return response.json() as Promise<PlaceWithCountry[]>;
  }
}
