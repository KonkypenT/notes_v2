import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthDataModel } from '../models/auth-data.model';
import { RegisterDataModel } from '../models/register-data.model';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { JwtModel } from '../models/jwt.model';
import { Urls } from '../consts/urls';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public auth(data: AuthDataModel): Observable<JwtModel> {
    const url = Urls.core.auth;

    return this.httpClient.post<JwtModel>(url, data);
  }

  public register(data: RegisterDataModel): Observable<void> {
    const url = Urls.core.register;

    return this.httpClient.post<void>(url, data);
  }

  public getProfile(): Observable<UserModel> {
    const url = Urls.profile.getProfile;

    return this.httpClient.get<UserModel>(url);
  }

  public getPhotoProfile(): Observable<any> {
    const url = Urls.profile.getPhoto;

    return this.httpClient.get<any>(url);
  }
}
