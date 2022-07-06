import { Component } from '@angular/core';
import { ROUTING_NAME } from '../../shared/consts/routing.const';
import { FriendsService } from '../../shared/rest/friends.rest';
import { first } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { UserState } from '../../shared/store/user/user.state';
import { SetCount } from '../../shared/store/count-application-friend/count-application-friend.action';
import { Observable } from 'rxjs';
import { CountApplicationFriendState } from '../../shared/store/count-application-friend/count-application-friend.state';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage {
  public routingName = ROUTING_NAME;

  public countApplication: Observable<number> = this.store.select(CountApplicationFriendState.getCount);

  constructor(private friendsService: FriendsService, private store: Store) {}

  public ionViewDidEnter(): void {
    this.getCountApplicationFriend();
  }

  private getCountApplicationFriend(): void {
    const currentUser = this.store.selectSnapshot(UserState.getUser);

    this.friendsService
      .getCountApplication(currentUser.id)
      .pipe(first())
      .subscribe((result) => this.store.dispatch(new SetCount(result)));
  }
}
