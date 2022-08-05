import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController, ToastController } from '@ionic/angular';
import { ROUTING_NAME } from '../consts/routing.const';

@Injectable()
class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('auth/login')) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.navCtrl.navigateRoot(ROUTING_NAME.auth).then();
          const permissions = localStorage.getItem('visitPermissions');
          if (permissions) {
            this.showToast().then();
          }
        }
        console.log(error);
        return of(error);
      }),
    );
  }

  private async showToast(): Promise<void> {
    const toast = await this.toastCtrl.create({
      header: 'Ошибка авторизации!',
      message: 'Необходимо авторизоваться для дальнейшего использования приложения.',
      position: 'bottom',
      duration: 3000,
    });
    await toast.present();
  }
}

export const UnauthorizedInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UnauthorizedInterceptor,
  multi: true,
};
