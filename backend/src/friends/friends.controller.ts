import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApplicationModel } from './models/application.model';

@Controller('friends')
export class FriendsController {
  constructor(private friendService: FriendsService) {}

  @Post('add-friend')
  public async addFriend(@Request() req): Promise<void> {
    await this.friendService.addFriend(req.body);
  }

  @Post('accept-friend')
  public async acceptFriend(@Request() req): Promise<void> {
    await this.friendService.acceptFriend(req.body);
  }

  @Post('remove-friend')
  public async removeFriend(@Request() req): Promise<void> {
    await this.friendService.removeFriend(req.body);
  }

  @Get('get-applications/:id')
  public async getApplications(@Param() params): Promise<Partial<ApplicationModel[]>> {
    return await this.friendService.getApplications(params.id);
  }

  @Get('get-count-application/:id')
  public async getCountApplication(@Param() params): Promise<number> {
    return await this.friendService.getCountApplication(params.id);
  }

  @Get('get-all/:id')
  public async getAllFriends(@Param() params): Promise<ApplicationModel[]> {
    return await this.friendService.getAllFriends(params.id);
  }
}
