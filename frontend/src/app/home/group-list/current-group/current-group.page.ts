import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { filter, finalize, first, takeUntil } from 'rxjs/operators';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { InfoAboutGroupComponent } from '../info-about-group/info-about-group.component';
import { DOCUMENT } from '@angular/common';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { Store } from '@ngxs/store';
import { GroupService } from '../../../shared/rest/group.rest';
import { UserState } from '../../../shared/store/user/user.state';
import { SetCurrentGroup } from '../../../shared/store/current-group/current-group.action';
import { CurrentGroupState } from '../../../shared/store/current-group/current-group.state';
import { FriendsService } from '../../../shared/rest/friends.rest';
import { FriendModel } from '../../../shared/models/friend.model';
import { EventService } from '../../../shared/rest/event.rest';
import { EventsModel } from '../../../shared/models/events.model';
import { InfoAboutEventComponent } from '../info-about-event/info-about-event.component';
import { ROUTING_NAME } from '../../../shared/consts/routing.const';

@Component({
  selector: 'app-current-group.current-group',
  templateUrl: './current-group.page.html',
  styleUrls: ['./current-group.page.scss'],
})
export class CurrentGroupPage {
  public titleGroup: string = '';

  public friends: FriendModel[] = [];

  public events: EventsModel[] | null = null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private store: Store,
    private groupsService: GroupService,
    private friendService: FriendsService,
    private toastCtrl: ToastController,
    private eventService: EventService,
    private navCtrl: NavController,
  ) {}

  public ionViewDidEnter(): void {
    this.titleGroup = this.route.snapshot.queryParams.groupTitle;
    this.subscribeOnCurrentUser();
    this.subscribeOnCurrentGroup();
  }

  public ionViewDidLeave(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public async createEvent(): Promise<void> {
    await this.navCtrl.navigateForward([ROUTING_NAME.home, ROUTING_NAME.addEvent]);
    // this.getEvents();
  }

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
    modal.present().then();
  }

  public getCurrentGroup(event?: any): void {
    const { id } = this.route.snapshot.params;
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    forkJoin([
      this.groupsService.getCurrentGroup(id),
      this.friendService.getFriends(currentUser.id),
      this.eventService.getEvents(id),
    ])
      .pipe(
        first(),
        finalize(() => event?.target?.complete()),
      )
      .subscribe(([group, friends, events]) => {
        this.store.dispatch(new SetCurrentGroup(group));
        this.friends = friends;
        this.events = events;
      });
  }

  public async goToEvent(event: EventsModel): Promise<void> {
    const currentEvent = this.events.find((e) => e.id === event.id);
    const modal = await this.modalCtrl.create({
      component: InfoAboutEventComponent,
      id: MODAL_ID.infoAboutEvent,
      componentProps: {
        event: currentEvent,
      },
      canDismiss: true,
      presentingElement: this.documentRef.querySelector('.current-group'),
    });
    modal.present();
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

  private getEvents(): void {
    const currentGroup = this.store.selectSnapshot(CurrentGroupState.getCurrentGroup);
    this.eventService
      .getEvents(currentGroup.id)
      .pipe(first())
      .subscribe((result) => (this.events = result));
  }
}
