import { Controller, Get, Header, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserModel } from './users/user.model';
import { JwtModel } from './shared/models/jwt.model';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private registerService: RegisterService,
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Header('content-type', 'application/json')
  @Post('auth/login')
  public async login(@Request() req): Promise<JwtModel> {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getProfile(@Request() req): Promise<Partial<UserModel>> {
    const data = await this.userService.findOneById(req.user.id);
    return {
      id: data.id,
      firstName: data.firstName,
      username: data.username,
      surname: data.surname,
      email: data.email,
      photo: data.photo,
    };
  }

  @Post('register')
  public async register(@Request() req): Promise<void> {
    await this.registerService.register(req.body);
  }
}
