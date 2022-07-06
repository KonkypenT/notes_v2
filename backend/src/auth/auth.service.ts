import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../users/user.model';
import { JwtService } from '@nestjs/jwt';
import { JwtModel } from '../shared/models/jwt.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  public async validateUser(username: string, pass: string): Promise<UserModel | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  }

  public async login(user: UserModel): Promise<JwtModel> {
    return { access_token: this.jwtService.sign(user) };
  }
}
