import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../shared/rest/auth.rest';
import { NavController } from '@ionic/angular';
import { ROUTING_NAME } from '../shared/consts/routing.const';
import { catchError, first, switchMap } from 'rxjs/operators';
import { HttpStatusCode } from '@angular/common/http';
import { ERRORS_TEXT } from '../shared/consts/errors-text.const';
import { JwtModel } from '../shared/models/jwt.model';
import { Store } from '@ngxs/store';
import { SetUser } from '../shared/store/user/user.action';
import { PATTERN } from '../shared/consts/pattern.const';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
})
export class AuthPage {
  public formAuth = new FormGroup(
    {
      username: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
    },
    { validators: [this.passwordValidator] },
  );

  public authError = '';

  constructor(private authService: AuthService, private navCtrl: NavController, private store: Store) {}

  public auth(): void {
    const { username, password } = this.formAuth.value;
    const formatName = username.toLowerCase();

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
      )
      .subscribe((result) => {
        this.store.dispatch(new SetUser(result));
        this.navCtrl.navigateRoot([ROUTING_NAME.home, ROUTING_NAME.groupList]).then();
      });
  }

  public goToRegister(): void {
    this.navCtrl.navigateForward(ROUTING_NAME.register).then();
  }

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    return password.value.match(PATTERN.password) ? null : { passwordInvalid: true };
  }
}
