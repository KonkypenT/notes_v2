import { UserModel } from '../../users/user.model';

export interface FullInfoGroupModel {
  id: number;
  title: string;
  description: string;
  ownerId: number;
  photo: string;
  members: Partial<UserModel[]>;
}
