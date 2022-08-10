import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupFormModel } from '../../../shared/models/group-form.model';
import { GroupModel } from '../../../shared/models/group.model';
import { Store } from '@ngxs/store';
import { UserState } from '../../../shared/store/user/user.state';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent {
  public form = new FormGroup<GroupFormModel>({
    title: new FormControl<string>('', [Validators.required]),
  });

  constructor(private modalCtrl: ModalController, private store: Store) {}

  public closeModal(): void {
    this.modalCtrl.dismiss(undefined, 'close', MODAL_ID.createGroup).then();
  }

  public createGroup(): void {
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    const data: GroupModel = {
      title: this.form.controls.title.value.trim(),
      createDate: new Date(),
      isActive: true,
      ownerId: currentUser.id,
    };
    this.modalCtrl.dismiss(data, 'close', MODAL_ID.createGroup).then();
  }
}
