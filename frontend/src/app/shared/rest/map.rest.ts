import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from '../consts/urls';
import { PlaceModel } from '../models/place-model';

@Injectable({ providedIn: 'root' })
export class MapService {
  constructor(private httpClient: HttpClient) {}

  public getPlaceByCoords(lat: number, lon: number): Observable<PlaceModel> {
    const url = Urls.map.getPlaceByCoords(lat, lon);

    return this.httpClient.get<PlaceModel>(url);
  }
}
