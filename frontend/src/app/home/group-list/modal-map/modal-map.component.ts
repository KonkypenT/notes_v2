import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { load } from '@2gis/mapgl';
import { hideMap } from '../../../shared/functions/toggle-map.function';
import { MapService } from '../../../shared/rest/map.rest';
import { filter, first, takeUntil } from 'rxjs/operators';
import { PlaceModel } from '../../../shared/models/place-model';
import { MapStoreService } from '../../../shared/services/map-store.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss'],
})
export class ModalMapComponent {
  public marker = null;

  private map = null;

  private mapglAPI = null;

  private selectedPlace: PlaceModel | null = null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private mapService: MapService,
    private mapStore: MapStoreService,
  ) {}

  public async ionViewDidEnter(): Promise<void> {
    this.mapglAPI = await load();
    this.map = new this.mapglAPI.Map('container', {
      center: [55.31878, 25.23584],
      zoom: 13,
      key: environment.mapKey,
    });
    this.subscribeOnMapEvent();
    this.subscribeOnResetPosition();
    const coords = await this.geolocation.getCurrentPosition();
    this.setMyPosition(coords);
  }

  public ionViewDidLeave(): void {
    this.map.destroy();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public closeModal(): void {
    hideMap();
  }

  public applyPlace(): void {
    this.mapStore.setPlace(this.selectedPlace);
    hideMap();
  }

  private setMyPosition(pos: Geoposition) {
    const center = [pos.coords.longitude, pos.coords.latitude];
    this.map.setCenter(center);
    this.map.setZoom(16);
    new this.mapglAPI.CircleMarker(this.map, {
      coordinates: center,
      radius: 14,
      color: '#0088ff',
      strokeWidth: 4,
      strokeColor: '#ffffff',
      stroke2Width: 6,
      stroke2Color: '#0088ff55',
    });
  }

  private subscribeOnMapEvent(): void {
    this.map.on('click', (e) => {
      this.getPlaceByCoords(e.lngLat[1], e.lngLat[0]);
    });
  }

  private getPlaceByCoords(lat: number, lon: number): void {
    this.mapService
      .getPlaceByCoords(lat, lon)
      .pipe(first())
      .subscribe((result: PlaceModel) => {
        this.selectedPlace = result;
        this.marker && this.marker.destroy();
        this.marker = new this.mapglAPI.Marker(this.map, {
          coordinates: [lon, lat],
        });

        this.setMapPosition(lat, lon);
      });
  }

  private setMapPosition(lat: number, lon: number): void {
    const center = [lon, lat];
    this.map.setCenter(center);
    this.map.setZoom(18);
  }

  private subscribeOnResetPosition(): void {
    this.mapStore
      .getPlace()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((result) => !result),
      )
      .subscribe(async () => {
        const coords = await this.geolocation.getCurrentPosition();
        this.setMyPosition(coords);
        this.marker && this.marker.destroy();
      });
  }
}
