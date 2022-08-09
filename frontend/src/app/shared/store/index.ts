import { UserState } from './user/user.state';
import { CountApplicationFriendState } from './count-application-friend/count-application-friend.state';
import { GroupsState } from './groups/groups.state';
import { CurrentGroupState } from './current-group/current-group.state';
import { EventsState } from './events/groups.state';

export const STORE = [UserState, CountApplicationFriendState, GroupsState, CurrentGroupState, EventsState];
