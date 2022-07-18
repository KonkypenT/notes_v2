import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalMapComponent } from './home/group-list/modal-map/modal-map.component';
import { MODAL_ID } from './shared/consts/modal-id.const';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  public async ngOnInit(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ModalMapComponent,
      cssClass: 'modal-map',
      id: MODAL_ID.modalMap,
    });
    modal.present();
  }
}
