import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONSTANTS } from './constants';
import { UserModel } from '../users/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.secret,
    });
  }

  async validate(payload: any): Promise<Partial<UserModel>> {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      surname: payload.surname,
      firstName: payload.firstName,
      photo: payload.photo,
    };
  }
}
