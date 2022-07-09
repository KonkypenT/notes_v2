import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { FriendModel } from '../../../shared/models/friend.model';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent {
  @Input() public friends: FriendModel[] = [];

  constructor(private modalCtrl: ModalController) {}

  public closeModal(): void {
    this.modalCtrl.dismiss(undefined, undefined, MODAL_ID.addMember).then();
  }

  public add(): void {
    const friendsChecked = this.friends.filter((f) => f.isChecked);
    this.modalCtrl.dismiss(friendsChecked, undefined, MODAL_ID.addMember).then();
  }
}
