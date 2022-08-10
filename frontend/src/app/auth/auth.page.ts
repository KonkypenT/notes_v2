import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/rest/auth.rest';
import { NavController } from '@ionic/angular';
import { ROUTING_NAME } from '../shared/consts/routing.const';
import { catchError, finalize, first, switchMap } from 'rxjs/operators';
import { HttpStatusCode } from '@angular/common/http';
import { ERRORS_TEXT } from '../shared/consts/errors-text.const';
import { JwtModel } from '../shared/models/jwt.model';
import { Store } from '@ngxs/store';
import { SetUser } from '../shared/store/user/user.action';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
})
export class AuthPage {
  public formAuth = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public authError = '';

  public sendRequestAuth = false;

  constructor(private authService: AuthService, private navCtrl: NavController, private store: Store) {}

  public auth(): void {
    if (this.sendRequestAuth) {
      return;
    }

    this.sendRequestAuth = true;
    const { username, password } = this.formAuth.value;
    const formatName = username.toLowerCase().trim();

    this.authService
      .auth({ username: formatName, password })
      .pipe(
        first(),
        catchError((error) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.authError = ERRORS_TEXT.invalidPasswordOrLoginRu;
          }
          throw error;
        }),
        switchMap((result: JwtModel) => {
          localStorage.setItem('jwt', result.access_token);
          return this.authService.getProfile();
        }),
        finalize(() => (this.sendRequestAuth = false)),
      )
      .subscribe((result) => {
        this.store.dispatch(new SetUser(result));
        this.navCtrl.navigateRoot([ROUTING_NAME.home, ROUTING_NAME.groupList]).then();
      });
  }

  public goToRegister(): void {
    if (this.sendRequestAuth) {
      return;
    }

    this.navCtrl.navigateForward(ROUTING_NAME.register).then();
  }

  public focusInput(): void {
    this.authError = '';
  }
}
