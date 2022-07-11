import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { filter, finalize, first, takeUntil } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { InfoAboutGroupComponent } from '../info-about-group/info-about-group.component';
import { DOCUMENT } from '@angular/common';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { Store } from '@ngxs/store';
import { GroupService } from '../../../shared/rest/group.rest';
import { UserState } from '../../../shared/store/user/user.state';
import { ResetCurrentGroup, SetCurrentGroup } from '../../../shared/store/current-group/current-group.action';
import { CurrentGroupState } from '../../../shared/store/current-group/current-group.state';
import { FriendsService } from '../../../shared/rest/friends.rest';
import { FriendModel } from '../../../shared/models/friend.model';

@Component({
  selector: 'app-current-group.current-group',
  templateUrl: './current-group.page.html',
  styleUrls: ['./current-group.page.scss'],
})
export class CurrentGroupPage {
  public titleGroup: string = '';

  public friends: FriendModel[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private store: Store,
    private groupsService: GroupService,
    private friendService: FriendsService,
  ) {}

  public ionViewDidEnter(): void {
    this.titleGroup = this.route.snapshot.queryParams.groupTitle;
    this.subscribeOnCurrentUser();
    this.subscribeOnCurrentGroup();
  }

  public ionViewDidLeave(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(ResetCurrentGroup);
  }

  public createEvent(): void {}

  public async infoAboutGroup(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: InfoAboutGroupComponent,
      presentingElement: this.documentRef.querySelector('.current-group'),
      canDismiss: true,
      id: MODAL_ID.infoAboutGroup,
      componentProps: {
        friends: this.friends,
      },
    });
    modal.present();
  }

  public getCurrentGroup(event?: any): void {
    const { id } = this.route.snapshot.params;
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    forkJoin([this.groupsService.getCurrentGroup(id), this.friendService.getFriends(currentUser.id)])
      .pipe(
        first(),
        finalize(() => event?.target?.complete()),
      )
      .subscribe(([group, friends]) => {
        this.store.dispatch(new SetCurrentGroup(group));
        this.friends = friends;
      });
  }

  private subscribeOnCurrentGroup(): void {
    this.store
      .select(CurrentGroupState.getCurrentGroup)
      .pipe(
        filter((group) => !!group),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((group) => {
        this.titleGroup = group.title;
      });
  }

  private subscribeOnCurrentUser(): void {
    this.store
      .select(UserState.getUser)
      .pipe(
        filter((user) => !!user),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        this.getCurrentGroup();
      });
  }
}
