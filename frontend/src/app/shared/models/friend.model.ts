export interface FriendModel {
  id: number;
  userId: number;
  friendId: number;
  firstName: string;
  surname: string;
  username: string;
  email: string;
  linkId: number;
  photo: string;
  isChecked?: boolean;
}
