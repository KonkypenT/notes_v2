import { Controller, Post, Request } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post('add-members')
  public async addMembers(@Request() req): Promise<void> {
    await this.membersService.addMembers(req.body);
  }
}
