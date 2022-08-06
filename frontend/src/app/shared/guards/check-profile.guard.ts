import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ROUTING_NAME } from '../consts/routing.const';
import { parseJwt } from '../functions/parse-jwt.function';

@Injectable()
export class CheckProfileGuard implements CanActivate {
  constructor(private navCtrl: NavController) {}

  public canActivate(): boolean {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.navCtrl.navigateRoot([ROUTING_NAME.auth]);
      return false;
    }

    if (jwt === 'null') {
      this.navCtrl.navigateRoot([ROUTING_NAME.auth]);
      return false;
    }

    const jwtData = parseJwt(jwt);
    const currentUnix = Math.round(new Date().getTime() / 1000);

    return currentUnix < jwtData.exp;
  }
}
