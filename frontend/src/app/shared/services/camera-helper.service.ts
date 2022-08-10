import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChoosePhotoModel } from '../models/choose-photo.model';
import { ActionSheetButton } from '@ionic/core/dist/types/components/action-sheet/action-sheet-interface';
import { ActionCameraType } from '../enums/action-camera.enum';
import { MODAL_ID } from '../consts/modal-id.const';
import { ImageModalComponent } from '../components/image-modal/image-modal.component';
import { imageUrlToBase64 } from '../functions/image-url-to-base64.function';

@Injectable({ providedIn: 'root' })
export class CameraHelperService {
  private actionSheet: HTMLIonActionSheetElement;

  constructor(private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {}

  public async showActionSheet(
    photo?: string,
    canDeletePhoto: boolean = true,
    canAddPhoto: boolean = true,
  ): Promise<ChoosePhotoModel> {
    const buttons: ActionSheetButton[] = [];

    photo && buttons.push(this.createShowPreviewButton(photo));
    canAddPhoto && buttons.push(...this.createAddButtons());
    canDeletePhoto && buttons.push(this.createDeleteButton());

    this.actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        ...buttons,
        {
          text: 'Отмена',
          role: ActionCameraType.Cancel,
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
      role: ActionCameraType.Destructive,
      handler: async () => {
        await this.actionSheet.dismiss('', ActionCameraType.Destructive);
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
          await this.actionSheet.dismiss(camera, ActionCameraType.Camera);
        },
      },
      {
        text: 'Выбрать фото',
        handler: async () => {
          const photo = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            presentationStyle: 'fullscreen',
            source: CameraSource.Photos,
          });
          await this.actionSheet.dismiss(photo, ActionCameraType.Gallery);
        },
      },
    ];
  }

  private createShowPreviewButton(photo: string): ActionSheetButton {
    return {
      text: 'Посмотреть фото',
      role: ActionCameraType.View,
      handler: async () => {
        this.actionSheet.dismiss('', ActionCameraType.View);
        await this.showPreviewModal(photo);
      },
    };
  }

  private async showPreviewModal(photo: string): Promise<void> {
    await imageUrlToBase64(photo, async (dataUrl) => {
      const modal = await this.modalCtrl.create({
        id: MODAL_ID.imagePreview,
        component: ImageModalComponent,
        componentProps: {
          photo: dataUrl,
        },
      });

      await modal.present();
    });
  }
}
