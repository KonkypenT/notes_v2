import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-current-group',
  templateUrl: './current-group.page.html',
  styleUrls: ['./current-group.page.scss'],
})
export class CurrentGroupPage {
  public titleGroup: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private modalCtrl: ModalController) {}

  public ionViewDidEnter(): void {
    this.subscribeOnDataRouting();
  }

  public ionViewDidLeave(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public createEvent(): void {}

  public infoAboutGroup(): void {}

  private subscribeOnDataRouting(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      this.titleGroup = params.groupTitle;
    });
  }
}
