import { Component, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { filter, finalize, first, takeUntil } from 'rxjs/operators';
import { IonList, ModalController, ToastController } from '@ionic/angular';
import { InfoAboutGroupComponent } from '../info-about-group/info-about-group.component';
import { DOCUMENT } from '@angular/common';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { Select, Store } from '@ngxs/store';
import { GroupService } from '../../../shared/rest/group.rest';
import { UserState } from '../../../shared/store/user/user.state';
import { ResetCurrentGroup, SetCurrentGroup } from '../../../shared/store/current-group/current-group.action';
import { CurrentGroupState } from '../../../shared/store/current-group/current-group.state';
import { FriendsService } from '../../../shared/rest/friends.rest';
import { FriendModel } from '../../../shared/models/friend.model';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventService } from '../../../shared/rest/event.rest';
import { EventsModel } from '../../../shared/models/events.model';
import { InfoAboutEventComponent } from '../info-about-event/info-about-event.component';
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import { SetEvents } from '../../../shared/store/events/groups.action';
import { EventsState } from '../../../shared/store/events/groups.state';

@Component({
  selector: 'app-current-group.current-group',
  templateUrl: './current-group.page.html',
  styleUrls: ['./current-group.page.scss'],
})
export class CurrentGroupPage {
  @Select(EventsState.getEvents)
  public events$: Observable<EventsModel[]>;

  @ViewChild('listEvent') public listEvent: IonList;

  public titleGroup: string = '';

  public friends: FriendModel[] = [];

  public addedEventsInNativeCalendar: number[] = [];

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
    private calendar: Calendar,
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

  public async createEvent(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddEventComponent,
      id: MODAL_ID.addEvent,
    });
    await modal.present();
    const result = await modal.onDidDismiss();

    if (result.role !== 'create') {
      return;
    }

    this.showToastAboutCreateEvent().then();
    this.getEvents();
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
        this.store.dispatch([new SetCurrentGroup(group), new SetEvents(events)]);
        this.friends = friends;
      });
  }

  public async goToEvent(event: EventsModel): Promise<void> {
    const currentEvent = this.store.selectSnapshot(EventsState.getEvents).find((e) => e.id === event.id);
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

  public async addToCalendar(event: EventsModel): Promise<void> {
    const startDate = new Date(event.eventDate.toString().split('T')[0]);
    const endDate = new Date(event.endDate.toString().split('T')[0]);

    this.calendar.createCalendar({ calendarName: 'Мои события', calendarColor: '#00e676' }).then(
      async () => {
        const calendars = await this.calendar.listCalendars();
        const myCalendar = calendars.find((c) => c.name === 'Мои события');
        this.calendar
          .createEventWithOptions(event.title, event.placeEvent, '', startDate, endDate, {
            calendarName: 'Мои события',
            calendarId: myCalendar,
          })
          .then(
            () => {
              this.eventService.addEventInCalendar(event.id).pipe(first()).subscribe();
              this.listEvent.closeSlidingItems().then();
              this.addedEventsInNativeCalendar = [...this.addedEventsInNativeCalendar, event.id];
              this.showToastAboutAddEventInCalendar();
            },
            (err) => {
              console.log('dont create event', err);
            },
          );
      },
      (err) => {
        console.log('error', err);
      },
    );
  }

  public getEventIdFromNativeCalendar(eventId: number): boolean {
    return !!this.addedEventsInNativeCalendar.find((e) => e === eventId);
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

  private async showToastAboutCreateEvent(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Событие успешно создано',
      position: 'bottom',
      duration: 3000,
      color: 'success',
    });

    toast.present().then();
  }

  private async showToastAboutAddEventInCalendar(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Событие добавлено в календарь',
      position: 'bottom',
      duration: 2000,
      color: 'success',
    });

    toast.present().then();
  }

  private getEvents(): void {
    const currentGroup = this.store.selectSnapshot(CurrentGroupState.getCurrentGroup);
    this.eventService
      .getEvents(currentGroup.id)
      .pipe(first())
      .subscribe((result) => this.store.dispatch(new SetEvents(result)));
  }
}
