import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, filter, first, switchMap, takeUntil } from 'rxjs/operators';
import { UserService } from '../../../shared/rest/user.rest';
import { UserModel } from '../../../shared/models/user.model';
import { FriendsService } from '../../../shared/rest/friends.rest';
import { Store } from '@ngxs/store';
import { UserState } from '../../../shared/store/user/user.state';
import { Observable, Subject } from 'rxjs';
import { IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.page.html',
  styleUrls: ['./my-applications.page.scss'],
})
export class MyApplicationsPage {
  public formSearch = new FormGroup({
    search: new FormControl<string>(''),
  });

  public users: Partial<UserModel[] | null> = null;

  public currentUser: Observable<Partial<UserModel>> = this.store.select(UserState.getUser);

  @ViewChild('listFriend') public listFriend: IonList;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private friendService: FriendsService,
    private store: Store,
    private toastCtrl: ToastController,
  ) {}

  public ionViewDidEnter(): void {
    this.subscribeOnSearch();
  }

  public ionViewDidLeave(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public addToFriend(user: Partial<UserModel>): void {
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    this.friendService
      .addToFriend(user.id, currentUser.id)
      .pipe(first())
      .subscribe(async () => {
        await this.listFriend.closeSlidingItems();
        const toast = await this.toastCtrl.create({
          message: 'Вы успешно отправили заявку в друзья',
          position: 'bottom',
          duration: 3000,
        });
        await toast.present();
      });
  }

  private subscribeOnSearch(): void {
    this.formSearch.controls.search.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((search) => search?.length > 2),
        distinctUntilChanged(),
        switchMap((search) => this.userService.getUser(search)),
      )
      .subscribe((val) => (this.users = val));
  }
}
