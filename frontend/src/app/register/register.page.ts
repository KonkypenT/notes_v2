import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../shared/rest/auth.rest';
import { catchError, filter, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { VALIDATORS } from '../shared/consts/validators.const';
import { NavController, ToastController } from '@ionic/angular';
import { ROUTING_NAME } from '../shared/consts/routing.const';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public formRegister = new FormGroup(
    {
      firstName: new FormControl<string>('', [Validators.required]),
      surname: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.pattern(VALIDATORS.email)]),
      username: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required, Validators.pattern(VALIDATORS.password)]),
    },
    { validators: [this.passwordValidator] },
  );

  public registerError = '';

  constructor(private authService: AuthService, private navCtrl: NavController, private toastCtrl: ToastController) {}

  public async register(): Promise<void> {
    this.registerError = '';
    const { firstName, surname, email, username, password } = this.formRegister.value;
    const formatName = username.toLowerCase().trim();

    this.authService
      .register({
        firstName: firstName.trim(),
        surname: surname.trim(),
        email: email.trim(),
        username: formatName,
        password,
      })
      .pipe(
        first(),
        catchError((error) => {
          this.registerError = error.error.message;
          return of(error);
        }),
        filter((result) => !result?.error),
      )
      .subscribe(async () => {
        await this.navCtrl.navigateBack(ROUTING_NAME.auth);
        await this.showToast();
      });
  }

  private async showToast(): Promise<void> {
    const toast = await this.toastCtrl.create({
      header: 'Вы успешно зарегистрировались!',
      message: 'Выполните вход.',
      position: 'bottom',
      duration: 3000,
    });
    await toast.present();
  }

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    return password.value.match(VALIDATORS.password) ? null : { passwordInvalid: true };
  }
}
