import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AddMemberComponent } from '../add-member/add-member.component';
import { FriendModel } from '../../../shared/models/friend.model';
import { Select, Store } from '@ngxs/store';
import { CurrentGroupState } from '../../../shared/store/current-group/current-group.state';
import { Observable } from 'rxjs';
import { FullInfoGroupModel } from '../../../shared/models/full-info-group.model';
import { GroupService } from '../../../shared/rest/group.rest';
import { first, switchMap } from 'rxjs/operators';
import { UpdateInfoAboutGroup } from '../../../shared/store/current-group/current-group.action';

@Component({
  selector: 'app-info-about-group',
  templateUrl: './info-about-group.component.html',
  styleUrls: ['./info-about-group.component.scss'],
})
export class InfoAboutGroupComponent implements OnInit {
  @Input() public friends: FriendModel[] = [];

  @Select(CurrentGroupState.getCurrentGroup)
  public currentGroup$!: Observable<FullInfoGroupModel>;

  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    private modalCtrl: ModalController,
    private store: Store,
    private toastCtrl: ToastController,
    private groupService: GroupService,
  ) {}

  public ngOnInit(): void {
    this.patchForm();
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(undefined, undefined, MODAL_ID.infoAboutGroup).then();
  }

  public async addMember(): Promise<void> {
    const currentGroup = this.store.selectSnapshot(CurrentGroupState.getCurrentGroup);
    const modal = await this.modalCtrl.create({
      component: AddMemberComponent,
      componentProps: {
        friends: this.friends,
        groupId: currentGroup.id,
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

  public save(): void {
    const value = this.form.value;
    const currentGroup = this.store.selectSnapshot(CurrentGroupState.getCurrentGroup);

    this.groupService
      .updateInfoAboutGroup(value.title, value.description, currentGroup.id)
      .pipe(
        first(),
        switchMap(() => this.store.dispatch(new UpdateInfoAboutGroup(value.title, value.description))),
      )
      .subscribe(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Информация о группе обновлена!',
          position: 'bottom',
          duration: 3000,
          color: 'success',
        });
        toast.present().then();
      });
  }

  private patchForm(): void {
    const currentGroup = this.store.selectSnapshot(CurrentGroupState.getCurrentGroup);
    this.form.patchValue({
      title: currentGroup.title,
      description: currentGroup.description,
    });
  }
}
