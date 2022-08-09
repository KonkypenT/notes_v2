import {
  Controller,
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
import { GroupService } from './group.service';
import { GroupViewModel } from './models/group-view.model';
import { FullInfoGroupModel } from './models/full-info-group.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../shared/pipes/file-valid.pipe';

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

  @Post('update-photo')
  @UseInterceptors(FileInterceptor('photo'))
  public async setPhoto(
    @Query('groupId') groupId: number,
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ): Promise<void> {
    if (!file) {
      throw new HttpException('Unprocessable entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return await this.groupService.setPhoto(file, groupId);
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
