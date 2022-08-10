import { environment } from '../../../environments/environment';

export class Urls {
  public static core = {
    auth: `${environment.baseUrl}/auth/login`,
    register: `${environment.baseUrl}/register`,
  };

  public static profile = {
    getProfile: `${environment.baseUrl}/profile`,
    edit: `${environment.baseUrl}/user/edit`,
    setPhoto: `${environment.baseUrl}/user/set-photo`,
    deletePhoto: `${environment.baseUrl}/user/delete-photo`,
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
    getCurrentGroup: (groupId: number): string => `${environment.baseUrl}/group/get-current-group?groupId=${groupId}`,
    setPhoto: (groupId: number): string => `${environment.baseUrl}/group/update-photo?groupId=${groupId}`,
    addGroup: `${environment.baseUrl}/group/add-group`,
    updateInfo: `${environment.baseUrl}/group/update-info`,
  };

  public static members = {
    addMembers: `${environment.baseUrl}/members/add-members`,
  };

  public static events = {
    getEvents: (groupId: number): string => `${environment.baseUrl}/events/get-events/${groupId}`,
    setPhoto: (eventId: number): string => `${environment.baseUrl}/events/update-photo?eventId=${eventId}`,
    addEvent: `${environment.baseUrl}/events/add-event`,
    addEventInCalendar: `${environment.baseUrl}/events/add-event-in-calendar`,
  };

  public static map = {
    getPlaceByCoords: (lat: number, lon: number): string =>
      `https://catalog.api.2gis.com/3.0/items/geocode?lat=${lat}&lon=${lon}&fields=items.point&key=${environment.dictionaryKey}`,
    search: (value: string, lat: number, lon: number): string =>
      `https://catalog.api.2gis.com/3.0/items?q=${value}&sort_point=${lon},${lat}&key=${environment.dictionaryKey}`,
    searchCoords: (value: string): string =>
      `https://catalog.api.2gis.com/3.0/items/byid?id=${value}&fields=items.point&key=${environment.dictionaryKey}`,
  };
}
