import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ResetCurrentGroup, SetCurrentGroup } from './current-group.action';
import { FullInfoGroupModel } from '../../models/full-info-group.model';

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
}
