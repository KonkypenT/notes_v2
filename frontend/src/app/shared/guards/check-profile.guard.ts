import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { parseJwt } from '../functions/parse-jwt.function';

export class CheckProfileGuard implements CanActivate {
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return false;
    }
    const jwtData = parseJwt(jwt);
    const currentUnix = Math.round(new Date().getTime() / 1000);

    return currentUnix < jwtData.exp;
  }
}
