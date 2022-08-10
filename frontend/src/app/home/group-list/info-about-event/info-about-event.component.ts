import { Component, Input, OnInit } from '@angular/core';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsModel } from '../../../shared/models/events.model';
import { CurrentGroupState } from '../../../shared/store/current-group/current-group.state';
import { UserState } from '../../../shared/store/user/user.state';
import { first } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { CameraHelperService } from '../../../shared/services/camera-helper.service';
import { EventService } from '../../../shared/rest/event.rest';
import { UpdateEventPhoto } from '../../../shared/store/events/groups.action';
import { ActionCameraType } from '../../../shared/enums/action-camera.enum';

@Component({
  selector: 'app-info-about-event',
  templateUrl: './info-about-event.component.html',
  styleUrls: ['./info-about-event.component.scss'],
})
export class InfoAboutEventComponent implements OnInit {
  @Input() public event: EventsModel | null = null;

  public eventPhoto = '';

  public form = new FormGroup({
    title: new FormControl<string>({ value: '', disabled: true }),
    endDate: new FormControl<Date>({ value: null, disabled: true }),
    eventDate: new FormControl<Date>({ value: null, disabled: true }),
    placeEvent: new FormControl<string>({ value: '', disabled: true }),
  });

  constructor(
    private modalCtrl: ModalController,
    private store: Store,
    private cameraHelperService: CameraHelperService,
    private eventsService: EventService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.patchForm();
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(undefined, undefined, MODAL_ID.infoAboutEvent).then();
  }

  public async showActionSheet(): Promise<void> {
    const currentGroup = this.store.selectSnapshot(CurrentGroupState.getCurrentGroup);
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    const currentUserIsOwner = currentGroup.ownerId === currentUser.id;
    const result = await this.cameraHelperService.showActionSheet(
      this.eventPhoto || null,
      currentUserIsOwner,
      currentUserIsOwner,
    );

    if (result?.data?.dataUrl) {
      this.store.dispatch([new UpdateEventPhoto(result.data.dataUrl, this.event.id)]);
      this.eventPhoto = result?.data?.dataUrl;
      const blob = await fetch(result?.data?.dataUrl).then((res) => res.blob());
      this.eventsService.setPhoto(blob, this.event.id).pipe(first()).subscribe();
    }

    if (result.role === ActionCameraType.Destructive) {
      this.store.dispatch(new UpdateEventPhoto(null, currentGroup.id));
      this.eventPhoto = null;
      this.eventsService.deletePhoto(this.event.id).pipe(first()).subscribe();
    }
  }

  private patchForm(): void {
    this.form.patchValue({
      title: this.event.title,
      endDate: this.event.endDate,
      eventDate: this.event.eventDate,
      placeEvent: this.event.placeEvent,
    });
    this.eventPhoto = this.event.photo;
  }
}
