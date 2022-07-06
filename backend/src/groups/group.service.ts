import { Injectable } from '@nestjs/common';
import { GroupModel } from './models/group.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { MembersService } from '../members/members.service';
import { GroupView } from './views/group-view.entity';
import { GroupViewModel } from './models/group-view.model';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(GroupView) private groupView: Repository<GroupView>,
    private membersService: MembersService,
  ) {}

  public async addGroup(group: GroupModel): Promise<void> {
    const newGroup = await this.groupRepository.insert(group);
    await this.membersService.addOwnerGroup(group.ownerId, newGroup.identifiers[0].id);
  }

  public async getGroups(userId: number): Promise<GroupViewModel[]> {
    return (await this.groupView.findBy({ userId })) || [];
  }
}
