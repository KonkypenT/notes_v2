import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FullInfoGroupModel } from '../../../shared/models/full-info-group.model';
import { DOCUMENT } from '@angular/common';
import { AddMemberComponent } from '../add-member/add-member.component';
import { FriendModel } from '../../../shared/models/friend.model';

@Component({
  selector: 'app-info-about-group',
  templateUrl: './info-about-group.component.html',
  styleUrls: ['./info-about-group.component.scss'],
})
export class InfoAboutGroupComponent implements OnInit {
  @Input() public group: FullInfoGroupModel | null = null;

  @Input() public friends: FriendModel[] = [];

  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(@Inject(DOCUMENT) private readonly documentRef: Document, private modalCtrl: ModalController) {}

  public ngOnInit(): void {
    this.patchForm();
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(undefined, undefined, MODAL_ID.infoAboutGroup).then();
  }

  public async addMember(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddMemberComponent,
      componentProps: {
        friends: this.friends,
      },
      id: MODAL_ID.addMember,
      canDismiss: true,
      presentingElement: this.documentRef.querySelector('app-info-about-group'),
    });
    await modal.present();
    const result = await modal.onDidDismiss();

    if (!result?.data?.length) {
      return;
    }
  }

  private patchForm(): void {
    this.form.patchValue({
      title: this.group.title,
      description: this.group.description,
    });
  }
}
