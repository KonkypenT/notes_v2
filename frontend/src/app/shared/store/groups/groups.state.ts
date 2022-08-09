import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { GroupModel } from '../../models/group.model';
import { ResetGroups, SetGroups, UpdateGroupPhoto } from './groups.action';
import { updateItem } from '@ngxs/store/operators';

@State<GroupModel[]>({
  name: 'groups',
  defaults: [],
})
@Injectable()
export class GroupsState {
  @Selector()
  public static getGroups(state: GroupModel[]): GroupModel[] {
    return state;
  }

  @Action(SetGroups)
  public setGroups(ctx: StateContext<GroupModel[]>, { groups }: SetGroups): void {
    ctx.setState(groups);
  }

  @Action(ResetGroups)
  public resetGroups(ctx: StateContext<GroupModel[]>): void {
    ctx.setState([]);
  }

  @Action(UpdateGroupPhoto)
  public updateGroupPhoto(ctx: StateContext<GroupModel[]>, { photo, groupId }: UpdateGroupPhoto): void {
    const currentGroup = ctx.getState().find((item) => item.id === groupId);

    if (!currentGroup) {
      return;
    }

    const changedGroup = {
      ...currentGroup,
      photo,
    };
    ctx.setState(updateItem((item) => item.id === groupId, changedGroup));
  }
}
