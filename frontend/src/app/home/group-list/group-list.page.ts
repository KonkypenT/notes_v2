import { Component } from '@angular/core';
import { GroupService } from '../../shared/rest/group.rest';
import { ModalController, NavController } from '@ionic/angular';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MODAL_ID } from '../../shared/consts/modal-id.const';
import { filter, finalize, first, switchMap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { UserState } from '../../shared/store/user/user.state';
import { GroupModel } from '../../shared/models/group.model';
import { Subject } from 'rxjs';
import { ROUTING_NAME } from '../../shared/consts/routing.const';
import { SetGroups } from '../../shared/store/groups/groups.action';
import { ResetCurrentGroup } from '../../shared/store/current-group/current-group.action';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.page.html',
  styleUrls: ['./group-list.page.scss'],
})
export class GroupListPage {
  public groups: GroupModel[] | null = null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private groupService: GroupService,
    private modalCtrl: ModalController,
    private store: Store,
    private navCtrl: NavController,
  ) {}

  public async ionViewDidEnter(): Promise<void> {
    this.subscribeOnCurrentUser();
    this.store.dispatch(ResetCurrentGroup);
  }

  public ionViewDidLeave(): void {
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

  public getGroups(event?: any): void {
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    this.groupService
      .getGroups(currentUser.id)
      .pipe(
        first(),
        finalize(() => event?.target?.complete()),
      )
      .subscribe((result) => {
        this.groups = result;
        this.store.dispatch(new SetGroups(result));
      });
  }

  public goToGroup(group: GroupModel): void {
    this.navCtrl
      .navigateForward([ROUTING_NAME.home, ROUTING_NAME.currentGroup, group.id], {
        queryParams: { groupTitle: group.title },
      })
      .then();
  }

  private subscribeOnCurrentUser(): void {
    this.store
      .select(UserState.getUser)
      .pipe(
        filter((user) => !!user),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.getGroups());
  }
}
