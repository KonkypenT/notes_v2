import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { ChoosePhotoModel } from '../models/choose-photo.model';

@Injectable({ providedIn: 'root' })
export class CameraHelperService {
  constructor(private actionSheetCtrl: ActionSheetController) {}

  public async showActionSheet(canDeletePhoto: boolean = true, canAddPhoto: boolean = true): Promise<ChoosePhotoModel> {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Удалить',
          role: 'destructive',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Сделать снимок',
          handler: async () => {
            const camera = await Camera.getPhoto({
              resultType: CameraResultType.DataUrl,
              direction: CameraDirection.Front,
              presentationStyle: 'fullscreen',
              source: CameraSource.Camera,
            });
            await actionSheet.dismiss(camera, 'camera');
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
            console.log(photo);
            await actionSheet.dismiss(photo, 'galery');
          },
        },
        {
          text: 'Отмена',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log(role, data);

    return { role, data };
  }
}
