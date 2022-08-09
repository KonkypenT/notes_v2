import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entity/event.entity';
import { EventsModel } from './models/events.model';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectS3() private readonly s3: S3,
  ) {}

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
        photo: body.photo || null,
        isActive: true,
        latitude: body.latitude?.toString() || null,
        longitude: body.longitude?.toString() || null,
        isNativeCalendar: false,
      })
      .execute();
  }

  public async getEvents(groupId: number): Promise<EventsModel[]> {
    return await this.eventRepository.findBy({ groupId });
  }

  public async addEventInCalendar(eventId: number): Promise<void> {
    await this.eventRepository
      .createQueryBuilder()
      .update()
      .set({ isNativeCalendar: true })
      .where({ id: eventId })
      .execute();
  }

  public async setPhoto(value: any, eventId: number): Promise<void> {
    const load = await this.s3
      .upload({
        Bucket: 'cg11909-my-events',
        Key: `event-${eventId}-avatar`,
        Body: value.buffer,
        ContentType: value.mimetype,
      })
      .promise();

    await this.eventRepository
      .createQueryBuilder()
      .update()
      .set({
        photo: load.Location,
      })
      .where({ id: eventId })
      .execute();
  }
}
