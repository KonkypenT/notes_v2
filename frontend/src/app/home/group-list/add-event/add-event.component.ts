import { Component } from '@angular/core';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../shared/rest/event.rest';
import { first } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { CurrentGroupState } from '../../../shared/store/current-group/current-group.state';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent {
  public form = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    eventDate: new FormControl<Date>(null, Validators.required),
    endDate: new FormControl<Date>(null, Validators.required),
    placeEvent: new FormControl<string>('', Validators.required),
  });

  constructor(private modalCtrl: ModalController, private eventService: EventService, private store: Store) {}

  public closeModal(): void {
    this.modalCtrl.dismiss(undefined, 'close', MODAL_ID.addEvent).then();
  }

  public createEvent(): void {
    const currentGroup = this.store.selectSnapshot(CurrentGroupState.getCurrentGroup);
    const data = {
      title: this.form.value.title,
      eventDate: this.form.value.eventDate,
      placeEvent: this.form.value.placeEvent,
      endDate: this.form.value.endDate,
    };
    this.eventService
      .addEvent(data, currentGroup.id)
      .pipe(first())
      .subscribe(() => {
        this.modalCtrl.dismiss(undefined, 'create', MODAL_ID.addEvent).then();
      });
  }
}
