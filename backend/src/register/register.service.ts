import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS_TEXT } from '../shared/consts/errors-text.const';

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  public async register(user: User): Promise<void> {
    const saltOrRounds = 10;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const userData = {
      ...user,
      password: hash,
    };
    const login = await this.usersRepository.findOneBy({ username: user.username });
    if (login) {
      throw new ConflictException(ERRORS_TEXT.loginExistRu);
    }

    const email = await this.usersRepository.findOneBy({ email: user.email });
    if (email) {
      throw new ConflictException(ERRORS_TEXT.emailExistRu);
    }
    await this.usersRepository.save(userData);
  }
}
