import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MODAL_ID } from '../../../shared/consts/modal-id.const';
import { FriendModel } from '../../../shared/models/friend.model';
import { GroupService } from '../../../shared/rest/group.rest';
import { first, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { CurrentGroupState } from '../../../shared/store/current-group/current-group.state';
import { AddMembersInCurrentGroup } from '../../../shared/store/current-group/current-group.action';
import { UserModel } from '../../../shared/models/user.model';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  @Input() public friends: FriendModel[] = [];

  @Input() public groupId: number | null = null;

  constructor(private modalCtrl: ModalController, private groupService: GroupService, private store: Store) {}

  public ngOnInit(): void {
    this.filteredMembers();
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(undefined, undefined, MODAL_ID.addMember).then();
  }

  public add(): void {
    const friendsChecked = this.friends.filter((f) => f.isChecked);
    if (!friendsChecked.length) {
      return;
    }
    this.groupService
      .addMemberInGroup(friendsChecked, this.groupId)
      .pipe(
        first(),
        map(() => {
          return friendsChecked.map((f) => {
            return {
              id: f.friendId,
              username: f.username,
              firstName: f.firstName,
              surname: f.surname,
              email: f.email,
              photo: f.photo,
            };
          });
        }),
        switchMap((result: UserModel[]) => this.store.dispatch(new AddMembersInCurrentGroup(result))),
      )
      .subscribe(() => {
        this.modalCtrl.dismiss(friendsChecked, undefined, MODAL_ID.addMember).then();
      });
  }

  private filteredMembers(): void {
    const currentGroup = this.store.selectSnapshot(CurrentGroupState.getCurrentGroup);
    const membersId = currentGroup.members.map((m) => m.id);
    this.friends = this.friends.filter((f) => !membersId.includes(f.friendId));
  }
}
