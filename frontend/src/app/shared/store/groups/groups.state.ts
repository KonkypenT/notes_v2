import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { GroupModel } from '../../models/group.model';
import { ResetGroups, SetGroups } from './groups.action';

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
}
