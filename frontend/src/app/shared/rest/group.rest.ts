import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupModel } from '../models/group.model';
import { Observable } from 'rxjs';
import { Urls } from '../consts/urls';

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
}
