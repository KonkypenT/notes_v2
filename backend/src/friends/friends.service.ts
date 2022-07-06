import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friends } from './entities/friends.entity';
import { MeApplicationsFriend } from './entities/me-applications-friend.entity';
import { ApplicationsFriend } from './entities/applications-friend.entity';
import { ApplicationModel } from './models/application.model';
import { ApplicationsView } from './views/applications-view.entity';
import { FriendsView } from './views/friends-view.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends) private friendsRepository: Repository<Friends>,
    @InjectRepository(MeApplicationsFriend) private meApplicationsRepository: Repository<MeApplicationsFriend>,
    @InjectRepository(ApplicationsFriend) private applicationsFriend: Repository<ApplicationsFriend>,
    @InjectRepository(ApplicationsView) private applicationsView: Repository<ApplicationsView>,
    @InjectRepository(FriendsView) private friendsView: Repository<FriendsView>,
  ) {}

  public async addFriend({ userId, friendId }): Promise<void> {
    if (await this.checkHavingRequest(userId, friendId)) {
      return;
    }

    const application = await this.applicationsFriend
      .createQueryBuilder('ApplicationsFriend')
      .insert()
      .values({
        userId,
        friendId,
      })
      .execute();

    await this.meApplicationsRepository
      .createQueryBuilder('MeApplicationsFriend')
      .insert()
      .values({
        userId: friendId,
        friendId: userId,
        applicationId: application.identifiers[0].id,
      })
      .execute();
  }

  public async getApplications(userId: number): Promise<Partial<ApplicationModel[]>> {
    return (await this.applicationsView.findBy({ userId })) || [];
  }

  public async getCountApplication(userId: number): Promise<number> {
    return await this.applicationsView.countBy({ userId });
  }

  public async acceptFriend({ userId, friendId, applicationId }): Promise<void> {
    await this.meApplicationsRepository.delete({ applicationId: applicationId });
    await this.applicationsFriend.delete({ id: applicationId });
    const data = await this.friendsRepository
      .createQueryBuilder()
      .insert()
      .values({
        userId,
        friendId,
      })
      .execute();
    await this.friendsRepository
      .createQueryBuilder()
      .update()
      .set({ linkId: data.identifiers[0].id })
      .where('id = :id', { id: data.identifiers[0].id })
      .execute();
    await this.friendsRepository
      .createQueryBuilder()
      .insert()
      .values({
        userId: friendId,
        friendId: userId,
        linkId: data.identifiers[0].id,
      })
      .execute();
  }

  public async getAllFriends(userId: number): Promise<ApplicationModel[]> {
    return await this.friendsView.findBy({ userId });
  }

  public async removeFriend({ linkId }): Promise<void> {
    await this.friendsRepository.createQueryBuilder().delete().where({ linkId: linkId }).execute();
  }

  private async checkHavingRequest(userId, friendId): Promise<boolean> {
    const request = await this.applicationsFriend.findOneBy({ userId, friendId });
    return !!request;
  }
}
