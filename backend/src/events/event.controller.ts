import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { EventService } from './event.service';
import { EventsModel } from './models/events.model';

@Controller('events')
export class EventController {
  constructor(private eventsService: EventService) {}

  @Post('add-event')
  public async addEvent(@Request() req): Promise<void> {
    await this.eventsService.addEvent(req.body);
  }

  @Get('get-events/:id')
  public async getEvents(@Param() params): Promise<EventsModel[]> {
    return await this.eventsService.getEvents(params.id);
  }
}
