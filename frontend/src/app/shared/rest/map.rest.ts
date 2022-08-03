import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from '../consts/urls';
import { PlaceModel } from '../models/place-model';
import { ItemsResultModel, SearchMapModel } from '../models/search-map.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MapService {
  constructor(private httpClient: HttpClient) {}

  public getPlaceByCoords(lat: number, lon: number): Observable<PlaceModel> {
    const url = Urls.map.getPlaceByCoords(lat, lon);

    return this.httpClient.get<PlaceModel>(url);
  }

  public search(value: string, lat: number, lon: number): Observable<ItemsResultModel[]> {
    const url = Urls.map.search(value, lat, lon);

    return this.httpClient.get<SearchMapModel>(url).pipe(map((value) => value?.result?.items));
  }

  public getCoordsByAddress(value: string): Observable<PlaceModel> {
    const url = Urls.map.searchCoords(value);

    return this.httpClient.get<PlaceModel>(url);
  }
}
