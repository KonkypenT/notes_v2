import { FullInfoGroupModel } from '../../models/full-info-group.model';
import { UserModel } from '../../models/user.model';

export class SetCurrentGroup {
  static readonly type = '[Current Group] Set Current Group';
  constructor(public group: FullInfoGroupModel) {}
}

export class ResetCurrentGroup {
  static readonly type = '[Current Group] Reset Current Group';
}

export class AddMembersInCurrentGroup {
  static readonly type = '[Current Group] Add Members In Current Group';
  constructor(public members: UserModel[]) {}
}

export class UpdateInfoAboutGroup {
  static readonly type = '[Current Group] Update Info About Current Group';
  constructor(public title: string, public description: string) {}
}
