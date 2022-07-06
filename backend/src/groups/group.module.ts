import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { MembersService } from '../members/members.service';
import { Members } from '../members/entity/members.entity';
import { GroupView } from './views/group-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Members, GroupView])],
  providers: [GroupService, MembersService],
  exports: [GroupService],
})
export class GroupModule {}
