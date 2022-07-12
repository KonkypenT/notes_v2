import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entity/event.entity';
import { EventsModel } from './models/events.model';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private eventRepository: Repository<Event>) {}

  public async addEvent({ body, groupId }): Promise<void> {
    await this.eventRepository
      .createQueryBuilder()
      .insert()
      .values({
        groupId,
        title: body.title,
        createDate: body.createDate,
        endDate: body.endDate,
        placeEvent: body.placeEvent,
        eventDate: body.eventDate,
        photo: null,
        isActive: true,
      })
      .execute();
  }

  public async getEvents(groupId: number): Promise<EventsModel[]> {
    return await this.eventRepository.findBy({ groupId });
  }
}
