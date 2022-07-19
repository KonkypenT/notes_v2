import { Controller, Get, Header, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserModel } from './users/user.model';
import { JwtModel } from './shared/models/jwt.model';

@Controller()
export class AppController {
  constructor(private registerService: RegisterService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Header('content-type', 'application/json')
  @Post('auth/login')
  public async login(@Request() req): Promise<JwtModel> {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getProfile(@Request() req): Promise<Partial<UserModel>> {
    return await req.user;
  }

  @Post('register')
  public async register(@Request() req): Promise<void> {
    await this.registerService.register(req.body);
  }
}
