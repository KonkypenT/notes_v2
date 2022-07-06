import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupViewModel } from './models/group-view.model';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('add-group')
  public async addFriend(@Request() req): Promise<void> {
    await this.groupService.addGroup(req.body);
  }

  @Get('get-groups/:id')
  public async getGroups(@Param() params): Promise<GroupViewModel[]> {
    return await this.groupService.getGroups(params.id);
  }
}
