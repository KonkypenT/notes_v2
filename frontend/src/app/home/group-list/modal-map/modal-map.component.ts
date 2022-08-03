import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { load } from '@2gis/mapgl';
import { MapService } from '../../../shared/rest/map.rest';
import { filter, first, takeUntil } from 'rxjs/operators';
import { PlaceModel } from '../../../shared/models/place-model';
import { MapStoreService } from '../../../shared/services/map-store.service';
import { Subject } from 'rxjs';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ItemsResultModel } from '../../../shared/models/search-map.model';
import { SearchType } from '../../../shared/enums/search-type.enum';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss'],
})
export class ModalMapComponent {
  public marker = null;

  public searchValues: any[] = [];

  public searchValue: any;

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
    this.modalCtrl.dismiss(undefined, undefined, MODAL_ID.modalMap);
  }

  public applyPlace(): void {
    console.log(this.selectedPlace);
    this.mapStore.setPlace(this.selectedPlace);
    this.closeModal();
  }

  public async findMe(): Promise<void> {
    const coords = await this.geolocation.getCurrentPosition();
    this.setMyPosition(coords);
  }

  public searchChangeItem(event: { component: IonicSelectableComponent; value: ItemsResultModel }): void {
    this.mapService
      .getCoordsByAddress(event.value.id)
      .pipe(
        first(),
        filter((result) => !!result),
      )
      .subscribe((result) => {
        this.setMarkerPosition(result);
      });
  }

  public async searchChange(event: { component: IonicSelectableComponent; text: string }): Promise<void> {
    const coords = await this.geolocation.getCurrentPosition();
    const { latitude, longitude } = coords.coords;
    this.mapService
      .search(event.text, latitude, longitude)
      .pipe(
        first(),
        filter((result) => !!result && !!result.length),
      )
      .subscribe((result) => (this.searchValues = this.filterSearchResult(result)));
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
        this.setMarkerPosition(result);
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

  private filterSearchResult(result: ItemsResultModel[]): ItemsResultModel[] {
    return result.filter((value) => value.type !== SearchType.adm_div && value.type !== SearchType.street);
  }

  private setMarkerPosition(result: PlaceModel): void {
    this.selectedPlace = result;
    console.log(this.selectedPlace);
    this.marker && this.marker.destroy();
    this.marker = new this.mapglAPI.Marker(this.map, {
      coordinates: [result.result.items[0].point.lon, result.result.items[0].point.lat],
    });

    this.setMapPosition(result.result.items[0].point.lat, result.result.items[0].point.lon);
  }
}
