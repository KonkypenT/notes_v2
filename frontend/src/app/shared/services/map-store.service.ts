import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlaceModel } from '../models/place-model';

@Injectable({ providedIn: 'root' })
export class MapStoreService {
  private selectedPlace = new BehaviorSubject<PlaceModel | null>(null);

  public setPlace(value: PlaceModel | null): void {
    this.selectedPlace.next(value);
  }

  public getPlace(): Observable<PlaceModel | null> {
    return this.selectedPlace as Observable<PlaceModel | null>;
  }

  public getPlaceSnapshot(): PlaceModel | null {
    return this.selectedPlace.value;
  }
}
