import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
class SessionCookieInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const modified = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${jwt}`),
      });
      return next.handle(modified);
    }
    const modified = request.clone({
      headers: request.headers
        .append('Access-Control-Allow-Origin', `*`)
        .append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
        .append('Content-Type', 'application/json')
        .append('Accept', 'application/json'),
    });
    return next.handle(modified);
  }
}

export const SessionCookieInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SessionCookieInterceptor,
  multi: true,
};
