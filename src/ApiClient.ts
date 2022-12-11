import { Locale, TimesForLocale } from "./MetaType";
import { StateService } from "./StateService";
export class ApiClient {
  private _url: string;

  constructor() {
    this._url = "https://namaz-vakti.vercel.app/api/";
    // this._url = 'http://localhost:3000/';
  }

  getCities4Country(countryID: string, cb: (e: string[]) => void): void {
    this.httpGet(this._url + "regions?country=" + countryID, cb);
  }

  getDistricts4City(
    countryID: string,
    cityID: string,
    cb: (e: string[]) => void
  ): void {
    this.httpGet(
      this._url + "cities?region=" + cityID + "&country=" + countryID,
      cb
    );
  }

  getTimes4District(place: Locale, cb: (e: TimesForLocale) => void): void {
    this.httpGet(
      this._url +
        `timesFromPlace?country=${place.country}&region=${place.region}&city=${place.city}`,
      cb
    );
  }

  private httpGet(
    url: string,
    cb: ((e: string[]) => void) | ((e: string[][]) => void)
  ): void {
    const xmlhttp = new XMLHttpRequest();
    StateService.setLoading(true);
    StateService.setError(false);
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        cb(JSON.parse(this.responseText));
        StateService.setLoading(false);
      }
    };
    xmlhttp.onerror = function () {
      StateService.setLoading(false);
      StateService.setError(true);
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
}
