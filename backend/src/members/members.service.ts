import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Members } from './entity/members.entity';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(Members) private membersRepository: Repository<Members>) {}

  public async addOwnerGroup(userId: number, groupId: number): Promise<void> {
    await this.membersRepository
      .createQueryBuilder()
      .insert()
      .values({
        userId,
        groupId,
        isActive: true,
      })
      .execute();
  }
}
