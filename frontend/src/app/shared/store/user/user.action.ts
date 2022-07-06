import { UserModel } from '../../models/user.model';

export class SetUser {
  static readonly type = '[User] Set User';
  constructor(public user: UserModel) {}
}
