import { EventsModel } from '../../models/events.model';

export class SetEvents {
  static readonly type = '[Events] Set Events';
  constructor(public events: EventsModel[]) {}
}

export class ResetEvents {
  static readonly type = '[Events] Reset Events';
}

export class UpdateEventPhoto {
  static readonly type = '[Events] Update Photo';
  constructor(public photo: string, public eventId: number) {}
}
