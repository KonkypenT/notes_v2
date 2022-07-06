import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserModel } from '../../models/user.model';
import { Injectable } from '@angular/core';
import { SetUser } from './user.action';

@State<UserModel | null>({
  name: 'user',
  defaults: null,
})
@Injectable()
export class UserState {
  @Selector()
  public static getUser(state: UserModel): UserModel {
    return state;
  }

  @Action(SetUser)
  public setUser(ctx: StateContext<UserModel>, { user }: SetUser): void {
    ctx.setState(user);
  }
}
