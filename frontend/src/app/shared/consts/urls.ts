import { environment } from '../../../environments/environment';

export class Urls {
  public static core = {
    auth: `${environment.baseUrl}/auth/login`,
    register: `${environment.baseUrl}/register`,
  };

  public static profile = {
    getProfile: `${environment.baseUrl}/profile`,
    edit: `${environment.baseUrl}/user/edit`,
  };

  public static user = {
    getUser: (value: string): string => `${environment.baseUrl}/user/${value}`,
  };

  public static friend = {
    getApplications: (userId): string => `${environment.baseUrl}/friends/get-applications/${userId}`,
    getCount: (userId): string => `${environment.baseUrl}/friends/get-count-application/${userId}`,
    getFriends: (userId): string => `${environment.baseUrl}/friends/get-all/${userId}`,
    addFriend: `${environment.baseUrl}/friends/add-friend`,
    acceptFriend: `${environment.baseUrl}/friends/accept-friend`,
    removeFriend: `${environment.baseUrl}/friends/remove-friend`,
  };

  public static group = {
    getGroups: (userId: number): string => `${environment.baseUrl}/group/get-groups/${userId}`,
    addGroup: `${environment.baseUrl}/group/add-group`,
  };
}
