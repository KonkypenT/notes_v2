export interface GroupModel {
  id: number;
  title: string;
  createDate: Date;
  isActive: boolean;
  ownerId: number;
  photo?: string;
  inactiveDate?: Date;
}
