import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { Event } from './entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
