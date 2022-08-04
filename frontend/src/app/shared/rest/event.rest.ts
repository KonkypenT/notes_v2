import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../consts/urls';
import { EventRequestModel } from '../models/event-request.model';
import { HttpClient } from '@angular/common/http';
import { EventsModel } from '../models/events.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private httpClient: HttpClient) {}

  public addEvent(data: EventRequestModel, groupId: number): Observable<void> {
    const url = Urls.events.addEvent;

    const body = {
      ...data,
      createDate: new Date(),
    };

    return this.httpClient.post<void>(url, { body, groupId });
  }

  public getEvents(groupId: number): Observable<EventsModel[]> {
    const url = Urls.events.getEvents(groupId);

    return this.httpClient.get<EventsModel[]>(url);
  }

  public addEventInCalendar(eventId: number): Observable<void> {
    const url = Urls.events.addEventInCalendar;

    return this.httpClient.post<void>(url, { id: eventId });
  }
}
