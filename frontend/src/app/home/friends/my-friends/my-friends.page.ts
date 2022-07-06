import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { FriendsService } from '../../../shared/rest/friends.rest';
import { UserState } from '../../../shared/store/user/user.state';
import { finalize, first, switchMap } from 'rxjs/operators';
import { FriendModel } from '../../../shared/models/friend.model';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.page.html',
  styleUrls: ['./my-friends.page.scss'],
})
export class MyFriendsPage {
  public friends: FriendModel[] = [];

  constructor(private store: Store, private friendsService: FriendsService) {}

  public ionViewDidEnter(): void {
    this.getFriendList();
  }

  public removeFriend(friend: FriendModel): void {
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    this.friendsService
      .removeFriend(friend.linkId)
      .pipe(
        first(),
        switchMap(() => this.friendsService.getFriends(currentUser.id)),
      )
      .subscribe((result) => (this.friends = result));
  }

  public getFriendList(event?: any): void {
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    this.friendsService
      .getFriends(currentUser.id)
      .pipe(
        first(),
        finalize(() => event?.target?.complete()),
      )
      .subscribe((result) => (this.friends = result));
  }
}
