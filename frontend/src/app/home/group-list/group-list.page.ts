import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupService } from '../../shared/rest/group.rest';
import { ModalController } from '@ionic/angular';
import { CreateGroupComponent } from './info-about-group/create-group.component';
import { MODAL_ID } from '../../shared/consts/modal-id.const';
import { filter, first, switchMap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { UserState } from '../../shared/store/user/user.state';
import { GroupModel } from '../../shared/models/group.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.page.html',
  styleUrls: ['./group-list.page.scss'],
})
export class GroupListPage implements OnInit, OnDestroy {
  public groups: GroupModel[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(private groupService: GroupService, private modalCtrl: ModalController, private store: Store) {}

  public ngOnInit(): void {
    this.store
      .select(UserState.getUser)
      .pipe(
        filter((user) => !!user),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((user) => this.getGroups(user.id));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public async createGroup(): Promise<void> {
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    const modal = await this.modalCtrl.create({
      component: CreateGroupComponent,
      id: MODAL_ID.createGroup,
      canDismiss: true,
      initialBreakpoint: 0.35,
      breakpoints: [0, 0.35, 0.4, 0.5],
    });
    await modal.present();

    const dismiss = await modal.onDidDismiss();

    if (!dismiss.data) {
      return;
    }

    this.groupService
      .addGroup(dismiss.data)
      .pipe(
        first(),
        switchMap(() => this.groupService.getGroups(currentUser.id)),
      )
      .subscribe((result) => (this.groups = result));
  }

  private getGroups(userId: number): void {
    this.groupService
      .getGroups(userId)
      .pipe(first())
      .subscribe((result) => (this.groups = result));
  }
}
