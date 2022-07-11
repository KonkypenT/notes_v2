import { Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupViewModel } from './models/group-view.model';
import { FullInfoGroupModel } from './models/full-info-group.model';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('add-group')
  public async addFriend(@Request() req): Promise<void> {
    await this.groupService.addGroup(req.body);
  }

  @Post('update-info')
  public async updateInfo(@Request() req): Promise<void> {
    await this.groupService.updateInfo(req.body);
  }

  @Get('get-groups/:id')
  public async getGroups(@Param() params): Promise<GroupViewModel[]> {
    return await this.groupService.getGroups(params.id);
  }

  @Get('get-current-group')
  public async getCurrentGroup(@Query('groupId') groupId: number): Promise<FullInfoGroupModel> {
    return await this.groupService.getCurrentGroup({ groupId });
  }
}
