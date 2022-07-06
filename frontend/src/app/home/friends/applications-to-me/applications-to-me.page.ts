import { Component, ViewChild } from '@angular/core';
import { FriendsService } from '../../../shared/rest/friends.rest';
import { Store } from '@ngxs/store';
import { UserState } from '../../../shared/store/user/user.state';
import { finalize, first } from 'rxjs/operators';
import { ApplicationModel } from '../../../shared/models/application.model';
import { IonList } from '@ionic/angular';
import { forkJoin, Observable } from 'rxjs';
import { UserModel } from '../../../shared/models/user.model';
import { SetCount } from '../../../shared/store/count-application-friend/count-application-friend.action';

@Component({
  selector: 'app-applications-to-me',
  templateUrl: './applications-to-me.page.html',
  styleUrls: ['./applications-to-me.page.scss'],
})
export class ApplicationsToMePage {
  public applications: ApplicationModel[] = [];

  @ViewChild('listFriend') public listFriend: IonList;

  constructor(private friendsService: FriendsService, private store: Store) {}

  public ionViewDidEnter(): void {
    this.getDataForPage();
  }

  public async addToFriend(friend: ApplicationModel): Promise<void> {
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    await this.listFriend.closeSlidingItems();
    this.friendsService
      .acceptFriend(currentUser.id, friend.friendId, friend.id)
      .pipe(first())
      .subscribe(() => this.getDataForPage());
  }

  public getDataForPage(event?: any): void {
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    forkJoin([this.getApplications(currentUser), this.getCount(currentUser)])
      .pipe(
        first(),
        finalize(() => event?.target?.complete()),
      )
      .subscribe(([applications, count]) => {
        this.applications = applications;
        this.store.dispatch(new SetCount(count));
      });
  }

  private getApplications(currentUser: UserModel): Observable<ApplicationModel[]> {
    return this.friendsService.getApplications(currentUser.id);
  }

  private getCount(currentUser: UserModel): Observable<number> {
    return this.friendsService.getCountApplication(currentUser.id);
  }
}
