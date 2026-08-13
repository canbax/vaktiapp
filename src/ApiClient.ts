import type { PlaceMatchWithCountry, PlaceWithCountry } from '@/types';

export class ApiClient {
  private _baseUrl: string;
  private _controllers = new Map<string, AbortController>();

  constructor() {
    this._baseUrl = import.meta.env.VITE_API_URL ?? '/api/';
    // this._baseUrl = 'http://localhost:3000/api/';
  }

  private _newSignal(key: string): AbortSignal {
    this._controllers.get(key)?.abort();
    const controller = new AbortController();
    this._controllers.set(key, controller);
    return controller.signal;
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
    const response = await fetch(url, { method: 'GET', signal: this._newSignal('searchPlaces') });
    return (await response.json()) as Promise<PlaceMatchWithCountry[]>;
  }

  async nearByPlaces(lat: number, lng: number, lang?: string) {
    const url = `${this._baseUrl}nearByPlaces?lat=${lat}&lng=${lng}&lang=${lang}`;
    const response = await fetch(url, { method: 'GET', signal: this._newSignal('nearByPlaces') });
    return (await response.json()) as Promise<PlaceWithCountry[]>;
  }

  async placeById(id: string | number, lang?: string) {
    const url = `${this._baseUrl}placeById?id=${id}&lang=${lang}`;
    const response = await fetch(url, { method: 'GET', signal: this._newSignal('placeById') });
    return (await response.json()) as Promise<PlaceWithCountry>;
  }
}
