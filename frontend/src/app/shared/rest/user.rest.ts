import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Urls } from '../consts/urls';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public edit(data: Partial<UserModel>): Observable<Partial<UserModel>> {
    const url = Urls.profile.edit;

    return this.httpClient.put<Partial<UserModel>>(url, data);
  }

  public getUser(value: string): Observable<Partial<UserModel[]>> {
    const url = Urls.user.getUser(value);

    return this.httpClient.get<Partial<UserModel[]>>(url);
  }

  public setPhoto(photo: Blob): Observable<Partial<UserModel>> {
    const url = Urls.profile.setPhoto;
    const formData = new FormData();
    formData.append('photo', photo);

    return this.httpClient.post<Partial<UserModel>>(url, formData);
  }
}
