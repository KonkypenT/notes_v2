import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ERRORS_TEXT } from '../shared/consts/errors-text.const';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  public async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username });
  }

  public async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  public async editInfo(user: Partial<User>): Promise<Partial<User>> {
    const login = await this.usersRepository.findBy({ username: user.username });
    if (login?.length > 1) {
      throw new ConflictException(ERRORS_TEXT.loginExistRu);
    }

    await this.usersRepository.save(user);
    const data = await this.findOneById(user.id);

    return {
      email: data.email,
      firstName: data.firstName,
      id: data.id,
      surname: data.surname,
      username: data.username,
    };
  }

  public async findUserBySearch(value: string): Promise<Partial<UserModel[]>> {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username like :username', { username: '%' + value.toLowerCase() + '%' })
      .getMany();
    const data: Partial<UserModel[]> = users.map((u) => {
      return {
        id: u.id,
        username: u.username,
        firstName: u.firstName,
        surname: u.surname,
        email: u.email,
      };
    });
    return users?.length ? data : [];
  }
}
