import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserModel } from '../../models/user.model';
import { Injectable } from '@angular/core';
import { ResetUser, SetUser } from './user.action';

@State<UserModel | null>({
  name: 'user',
  defaults: null,
})
@Injectable()
export class UserState {
  @Selector()
  public static getUser(state: UserModel | null): UserModel {
    return state;
  }

  @Action(SetUser)
  public setUser(ctx: StateContext<UserModel | null>, { user }: SetUser): void {
    ctx.setState(user);
  }

  @Action(ResetUser)
  public resetUser(ctx: StateContext<UserModel> | null): void {
    ctx.setState(null);
  }
}
