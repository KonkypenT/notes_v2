import { Store } from '@ngxs/store';
import { ResetGroups } from '../store/groups/groups.action';
import { ResetUser } from '../store/user/user.action';
import { ResetCurrentGroup } from '../store/current-group/current-group.action';

export const resetStore = (store: Store): void => {
  store.dispatch([ResetGroups, ResetUser, ResetCurrentGroup]);
};
