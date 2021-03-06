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

  public async addMembers({ friends, groupId }): Promise<void> {
    console.log(friends);
    for (const f of friends) {
      console.log(f);
      await this.membersRepository
        .createQueryBuilder()
        .insert()
        .values({
          isActive: true,
          userId: f.friendId,
          groupId,
        })
        .execute();
    }
  }
}
