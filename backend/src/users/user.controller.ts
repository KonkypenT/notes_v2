import { Controller, Get, Param, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Put('edit')
  public async register(@Request() req): Promise<Partial<UserModel>> {
    return await this.userService.editInfo(req.body);
  }

  @Get(':value')
  public async findUser(@Param() params): Promise<Partial<UserModel[]>> {
    return await this.userService.findUserBySearch(params.value);
  }
}
