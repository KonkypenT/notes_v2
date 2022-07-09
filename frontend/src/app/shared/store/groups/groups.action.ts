import { GroupModel } from '../../models/group.model';

export class SetGroups {
  static readonly type = '[Groups] Set Groups';
  constructor(public groups: GroupModel[]) {}
}

export class ResetGroups {
  static readonly type = '[Groups] Reset Groups';
}
