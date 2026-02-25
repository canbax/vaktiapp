import type { PlaceMatchWithCountry, PlaceWithCountry } from '@/types';

export class ApiClient {
  private _baseUrl: string;

  constructor() {
    this._baseUrl = import.meta.env.VITE_API_URL ?? '/api/';
    // this._baseUrl = 'http://localhost:3000/api/';
  }

  async searchPlaces(
    searchTerm: string,
    lat?: number | null,
    lng?: number | null,
    lang?: string,
    countryCode = '',
  ) {
    const q = searchTerm ?? '';
    const url = `${this._baseUrl}searchPlaces?q=${q}&lat=${lat}&lng=${lng}&lang=${lang}&countryCode=${countryCode}`;
    const response = await fetch(url, { method: 'GET' });
    return (await response.json()) as Promise<PlaceMatchWithCountry[]>;
  }

  async nearByPlaces(lat: number, lng: number, lang?: string) {
    const url = `${this._baseUrl}nearByPlaces?lat=${lat}&lng=${lng}&lang=${lang}`;
    const response = await fetch(url, { method: 'GET' });
    return (await response.json()) as Promise<PlaceWithCountry[]>;
  }

  async placeById(id: string | number, lang?: string) {
    const url = `${this._baseUrl}placeById?id=${id}&lang=${lang}`;
    const response = await fetch(url, { method: 'GET' });
    return (await response.json()) as Promise<PlaceWithCountry>;
  }
}
