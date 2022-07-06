import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationModel } from '../models/application.model';
import { Urls } from '../consts/urls';
import { FriendModel } from '../models/friend.model';

@Injectable({ providedIn: 'root' })
export class FriendsService {
  constructor(private httpClient: HttpClient) {}

  public addToFriend(userId: number, friendId: number): Observable<void> {
    const data = { userId, friendId };
    const url = Urls.friend.addFriend;

    return this.httpClient.post<void>(url, data);
  }

  public getApplications(userId: number): Observable<Partial<ApplicationModel[]>> {
    const url = Urls.friend.getApplications(userId);

    return this.httpClient.get<Partial<ApplicationModel[]>>(url);
  }

  public getCountApplication(userId: number): Observable<number> {
    const url = Urls.friend.getCount(userId);

    return this.httpClient.get<number>(url);
  }

  public acceptFriend(userId: number, friendId: number, applicationId: number): Observable<void> {
    const data = { userId, friendId, applicationId };
    const url = Urls.friend.acceptFriend;

    return this.httpClient.post<void>(url, data);
  }

  public getFriends(userId: number): Observable<FriendModel[]> {
    const url = Urls.friend.getFriends(userId);

    return this.httpClient.get<FriendModel[]>(url);
  }

  public removeFriend(linkId: number): Observable<void> {
    const url = Urls.friend.removeFriend;

    return this.httpClient.post<void>(url, { linkId });
  }
}
