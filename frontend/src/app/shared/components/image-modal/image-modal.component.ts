import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MODAL_ID } from '../../consts/modal-id.const';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  @Input() public photo: string;

  public sliderOptions: any = {
    zoom: {
      maxRation: 5,
    },
  };

  constructor(private modalCtrl: ModalController) {}

  public close(): void {
    this.modalCtrl.dismiss(undefined, undefined, MODAL_ID.imagePreview);
  }
}
