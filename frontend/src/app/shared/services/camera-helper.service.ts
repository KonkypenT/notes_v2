import { Injectable } from "@angular/core";
import { Camera, CameraDirection, CameraResultType, CameraSource } from "@capacitor/camera";
import { ActionSheetController } from "@ionic/angular";

@Injectable({providedIn: 'root'})
export class CameraHelperService {
  constructor(private actionSheetCtrl: ActionSheetController) {}

  public async showActionSheet(canDeletePhoto: boolean = true, canAddPhoto: boolean = true): Promise<{ role: string, data: string }> {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Удалить',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Камера',
        icon: 'camera',
        handler: async () => {
          const camera = await Camera.getPhoto({
            resultType: CameraResultType.Base64, 
            direction: CameraDirection.Front,
            presentationStyle: 'fullscreen',
            source: CameraSource.Camera
          });
          await actionSheet.dismiss(camera, 'camera');
        }
      }, 
      {
        text: 'Выбрать фото',
        data: 'galery',
        icon: 'image-outline',
        handler: async () => {
          const photo = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            presentationStyle: 'fullscreen',
            source: CameraSource.Photos
          });
          await actionSheet.dismiss(photo, 'galery');
        }
      }, 
      {
        text: 'Отмена',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    
    return { role, data };
  }
}