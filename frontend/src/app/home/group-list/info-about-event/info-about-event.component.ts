import { Component, Input, OnInit } from '@angular/core';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsModel } from '../../../shared/models/events.model';

@Component({
  selector: 'app-info-about-event',
  templateUrl: './info-about-event.component.html',
  styleUrls: ['./info-about-event.component.scss'],
})
export class InfoAboutEventComponent implements OnInit {
  @Input() public event: EventsModel | null = null;

  public form = new FormGroup({
    title: new FormControl<string>({ value: '', disabled: true }),
    endDate: new FormControl<Date>({ value: null, disabled: true }),
    eventDate: new FormControl<Date>({ value: null, disabled: true }),
    placeEvent: new FormControl<string>({ value: '', disabled: true }),
  });

  constructor(private modalCtrl: ModalController) {}

  public async ngOnInit(): Promise<void> {
    this.patchForm();
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(undefined, undefined, MODAL_ID.infoAboutEvent).then();
  }

  private patchForm(): void {
    this.form.patchValue({
      title: this.event.title,
      endDate: this.event.endDate,
      eventDate: this.event.eventDate,
      placeEvent: this.event.placeEvent,
    });
  }
}
