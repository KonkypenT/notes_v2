import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetCount } from './count-application-friend.action';

@State<number | null>({
  name: 'countApplicationFriend',
  defaults: null,
})
@Injectable()
export class CountApplicationFriendState {
  @Selector()
  public static getCount(state: number): number {
    return state;
  }

  @Action(SetCount)
  public setCount(ctx: StateContext<number>, { count }: SetCount): void {
    ctx.setState(count);
  }
}
