import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventsModel } from './models/events.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../shared/pipes/file-valid.pipe';

@Controller('events')
export class EventController {
  constructor(private eventsService: EventService) {}

  @Post('add-event')
  public async addEvent(@Request() req): Promise<void> {
    await this.eventsService.addEvent(req.body);
  }

  @Post('add-event-in-calendar')
  public async addEventInCalendar(@Request() req): Promise<void> {
    await this.eventsService.addEventInCalendar(req.body.id);
  }

  @Post('update-photo')
  @UseInterceptors(FileInterceptor('photo'))
  public async setPhoto(
    @Query('eventId') eventId: number,
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ): Promise<void> {
    if (!file) {
      throw new HttpException('Unprocessable entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return await this.eventsService.setPhoto(file, eventId);
  }

  @Delete('delete-photo')
  public async deletePhoto(@Query('eventId') groupId: number): Promise<void> {
    return await this.eventsService.deletePhoto(groupId);
  }

  @Get('get-events/:id')
  public async getEvents(@Param() params): Promise<EventsModel[]> {
    return await this.eventsService.getEvents(params.id);
  }
}
