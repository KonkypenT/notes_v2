import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ResetEvents, SetEvents, UpdateEventPhoto } from './groups.action';
import { updateItem } from '@ngxs/store/operators';
import { EventsModel } from '../../models/events.model';

@State<EventsModel[]>({
  name: 'events',
  defaults: [],
})
@Injectable()
export class EventsState {
  @Selector()
  public static getEvents(state: EventsModel[]): EventsModel[] {
    return state;
  }

  @Action(SetEvents)
  public setEvents(ctx: StateContext<EventsModel[]>, { events }: SetEvents): void {
    ctx.setState(events);
  }

  @Action(ResetEvents)
  public resetEvents(ctx: StateContext<EventsModel[]>): void {
    ctx.setState([]);
  }

  @Action(UpdateEventPhoto)
  public updateEventPhoto(ctx: StateContext<EventsModel[]>, { photo, eventId }: UpdateEventPhoto): void {
    const currentEvent = ctx.getState().find((item) => item.id === eventId);

    if (!currentEvent) {
      return;
    }

    const changedEvent = {
      ...currentEvent,
      photo,
    };
    ctx.setState(updateItem((item) => item.id === eventId, changedEvent));
  }
}
