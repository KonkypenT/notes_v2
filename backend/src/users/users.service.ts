import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ERRORS_TEXT } from '../shared/consts/errors-text.const';
import { UserModel } from './user.model';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, @InjectS3() private readonly s3: S3) {}

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

  public async setPhoto(value: any, user: Partial<UserModel>): Promise<void> {
    const load = await this.s3
      .upload({
        Bucket: 'cg11909-2ab17f15-8aaa-4bf5-b248-758bb5ced9a8',
        Key: `${user.id}-avatar`,
        Body: value.buffer,
        ContentType: value.mimetype,
      })
      .promise();

    await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({
        photo: load.Key,
      })
      .where({ id: user.id })
      .execute();
  }

  public async getPhotoUser(user: Partial<UserModel>): Promise<any> {
    return await this.s3
      .getObject({
        Bucket: 'cg11909-2ab17f15-8aaa-4bf5-b248-758bb5ced9a8',
        Key: `${user.id}-avatar`,
      })
      .promise();
  }
}
