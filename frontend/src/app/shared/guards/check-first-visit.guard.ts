import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { ROUTING_NAME } from '../consts/routing.const';
import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Injectable()
export class CheckFirstVisitGuard implements CanActivate {
  constructor(private navCtrl: NavController, private platform: Platform) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const permissions = localStorage.getItem('visitPermissions');

    if (!permissions && this.platform.is('capacitor')) {
      this.navCtrl.navigateRoot([ROUTING_NAME.permission]).then();
      return false;
    }

    return true;
  }
}
