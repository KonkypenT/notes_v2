import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  AddMembersInCurrentGroup,
  ResetCurrentGroup,
  SetCurrentGroup,
  UpdateInfoAboutGroup,
} from './current-group.action';
import { FullInfoGroupModel } from '../../models/full-info-group.model';
import { patch } from '@ngxs/store/operators';

@State<FullInfoGroupModel | null>({
  name: 'currentGroup',
  defaults: null,
})
@Injectable()
export class CurrentGroupState {
  @Selector()
  public static getCurrentGroup(state: FullInfoGroupModel): FullInfoGroupModel {
    return state;
  }

  @Action(SetCurrentGroup)
  public setCurrentGroup(ctx: StateContext<FullInfoGroupModel>, { group }: SetCurrentGroup): void {
    ctx.setState(group);
  }

  @Action(ResetCurrentGroup)
  public resetCurrentGroup(ctx: StateContext<FullInfoGroupModel>): void {
    ctx.setState(null);
  }

  @Action(AddMembersInCurrentGroup)
  public addMembersInCurrentGroup(ctx: StateContext<FullInfoGroupModel>, { members }: AddMembersInCurrentGroup): void {
    ctx.setState(
      patch({
        members: [...ctx.getState().members, ...members],
      }),
    );
  }

  @Action(UpdateInfoAboutGroup)
  public updateInfoAboutGroup(ctx: StateContext<FullInfoGroupModel>, { title, description }: FullInfoGroupModel): void {
    ctx.setState(
      patch({
        title,
        description,
      }),
    );
  }
}
