import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupModel } from '../models/group.model';
import { Observable } from 'rxjs';
import { Urls } from '../consts/urls';
import { FullInfoGroupModel } from '../models/full-info-group.model';
import { FriendModel } from '../models/friend.model';

@Injectable({ providedIn: 'root' })
export class GroupService {
  constructor(private httpClient: HttpClient) {}

  public addGroup(group: GroupModel): Observable<void> {
    const url = Urls.group.addGroup;

    return this.httpClient.post<void>(url, group);
  }

  public getGroups(userId: number): Observable<GroupModel[]> {
    const url = Urls.group.getGroups(userId);

    return this.httpClient.get<GroupModel[]>(url);
  }

  public getCurrentGroup(groupId: number): Observable<FullInfoGroupModel> {
    const url = Urls.group.getCurrentGroup(groupId);

    return this.httpClient.get<FullInfoGroupModel>(url);
  }

  public addMemberInGroup(friends: FriendModel[], groupId: number): Observable<void> {
    const url = Urls.members.addMembers;
    const data = {
      friends,
      groupId,
    };

    return this.httpClient.post<void>(url, data);
  }

  public updateInfoAboutGroup(title: string, description: string, groupId): Observable<void> {
    const url = Urls.group.updateInfo;
    const data = {
      title,
      description,
      groupId,
    };

    return this.httpClient.post<void>(url, data);
  }

  public setPhoto(photo: Blob, groupId: number): Observable<void> {
    const url = Urls.group.setPhoto(groupId);
    const formData = new FormData();
    formData.append('photo', photo);

    return this.httpClient.post<void>(url, formData);
  }

  public deletePhoto(groupId: number): Observable<void> {
    const url = Urls.group.deletePhoto(groupId);

    return this.httpClient.delete<void>(url);
  }
}
