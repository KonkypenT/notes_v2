import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../shared/pipes/file-valid.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Put('edit')
  public async editInfo(@Request() req): Promise<Partial<UserModel>> {
    return await this.userService.editInfo(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('set-photo')
  @UseInterceptors(FileInterceptor('photo'))
  public async setPhoto(
    @Request() req,
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ): Promise<void> {
    if (!file) {
      throw new HttpException('Unprocessable entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return await this.userService.setPhoto(file, req.user);
  }

  @Get(':value')
  public async findUser(@Param() params): Promise<Partial<UserModel[]>> {
    return await this.userService.findUserBySearch(params.value);
  }
}
