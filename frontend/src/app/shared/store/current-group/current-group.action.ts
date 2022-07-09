import { FullInfoGroupModel } from '../../models/full-info-group.model';

export class SetCurrentGroup {
  static readonly type = '[Current Group] Set Current Group';
  constructor(public group: FullInfoGroupModel) {}
}

export class ResetCurrentGroup {
  static readonly type = '[Current Group] Reset Current Group';
}
