import { Injectable } from '@nestjs/common';
import { GroupModel } from './models/group.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { MembersService } from '../members/members.service';
import { GroupView } from './views/group-view.entity';
import { GroupViewModel } from './models/group-view.model';
import { FullInfoAboutGroupView } from './views/full-info-about-group.entity';
import { UserModel } from '../users/user.model';
import { FullInfoGroupModel } from './models/full-info-group.model';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(GroupView) private groupView: Repository<GroupView>,
    @InjectRepository(FullInfoAboutGroupView) private fullInfoGroupView: Repository<FullInfoAboutGroupView>,
    @InjectS3() private readonly s3: S3,
    private membersService: MembersService,
  ) {}

  public async addGroup(group: GroupModel): Promise<void> {
    const newGroup = await this.groupRepository.insert(group);
    await this.membersService.addOwnerGroup(group.ownerId, newGroup.identifiers[0].id);
  }

  public async getGroups(userId: number): Promise<GroupViewModel[]> {
    return (await this.groupView.findBy({ userId })) || [];
  }

  public async getCurrentGroup({ groupId }): Promise<FullInfoGroupModel> {
    const group = (await this.fullInfoGroupView.findBy({ id: groupId })) || [];
    const members: Partial<UserModel[]> = group.map((i) => {
      return {
        id: i.userId,
        firstName: i.firstName,
        surname: i.surname,
        photo: i.userPhoto,
        username: i.username,
        email: i.email,
      };
    });
    return {
      id: group[0].id,
      title: group[0].title,
      description: group[0].description,
      ownerId: group[0].ownerId,
      photo: group[0].photo,
      members,
    };
  }

  public async updateInfo({ title, description, groupId }): Promise<void> {
    await this.groupRepository
      .createQueryBuilder()
      .update()
      .set({
        title,
        description,
      })
      .where('id = :id', { id: groupId })
      .execute();
  }

  public async setPhoto(value: any, groupId: number): Promise<void> {
    const load = await this.s3
      .upload({
        Bucket: 'cg11909-my-events',
        Key: `group-${groupId}-avatar`,
        Body: value.buffer,
        ContentType: value.mimetype,
      })
      .promise();

    await this.groupRepository
      .createQueryBuilder()
      .update()
      .set({
        photo: load.Location,
      })
      .where({ id: groupId })
      .execute();
  }

  public async deletePhoto(groupId: number): Promise<void> {
    await this.s3.deleteObject({ Bucket: 'cg11909-my-events', Key: `group-${groupId}-avatar` }).promise();
    await this.groupRepository.createQueryBuilder().update().set({ photo: null }).where({ id: groupId }).execute();
  }
}
