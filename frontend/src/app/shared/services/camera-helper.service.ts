import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { ChoosePhotoModel } from '../models/choose-photo.model';
import { ActionSheetButton } from '@ionic/core/dist/types/components/action-sheet/action-sheet-interface';

@Injectable({ providedIn: 'root' })
export class CameraHelperService {
  private actionSheet: HTMLIonActionSheetElement;

  constructor(private actionSheetCtrl: ActionSheetController) {}

  public async showActionSheet(canDeletePhoto: boolean = true, canAddPhoto: boolean = true): Promise<ChoosePhotoModel> {
    const buttons: ActionSheetButton[] = [];

    canDeletePhoto && buttons.push(this.createDeleteButton());
    canAddPhoto && buttons.push(...this.createAddButtons());

    this.actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        ...buttons,
        {
          text: 'Отмена',
          role: 'cancel',
        },
      ],
    });
    await this.actionSheet.present();

    const { role, data } = await this.actionSheet.onDidDismiss();

    return { role, data };
  }

  private createDeleteButton(): ActionSheetButton {
    return {
      text: 'Удалить',
      role: 'destructive',
      id: 'delete-button',
      data: {
        type: 'delete',
      },
      handler: () => {
        console.log('Delete clicked');
      },
    };
  }

  private createAddButtons(): ActionSheetButton[] {
    return [
      {
        text: 'Сделать снимок',
        handler: async () => {
          const camera = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            direction: CameraDirection.Front,
            presentationStyle: 'fullscreen',
            source: CameraSource.Camera,
          });
          await this.actionSheet.dismiss(camera, 'camera');
        },
      },
      {
        text: 'Выбрать фото',
        data: 'galery',
        handler: async () => {
          const photo = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            presentationStyle: 'fullscreen',
            source: CameraSource.Photos,
          });
          await this.actionSheet.dismiss(photo, 'galery');
        },
      },
    ];
  }
}
