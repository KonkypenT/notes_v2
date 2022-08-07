import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import { NavController, Platform } from '@ionic/angular';
import { ROUTING_NAME } from '../shared/consts/routing.const';
import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-permission-screen',
  templateUrl: './permission-screen.page.html',
  styleUrls: ['./permission-screen.page.scss'],
})
export class PermissionScreenPage {
  constructor(
    private geolocation: Geolocation,
    private calendar: Calendar,
    private navCtrl: NavController,
    private platform: Platform,
  ) {}

  public async goToPermissions(): Promise<void> {
    await this.getPermissionToLocation();
    this.platform.is('capacitor') && (await this.getPermissionToCalendar());
    await this.getPermissionToCamera();
    localStorage.setItem('visitPermissions', 'true');
    await this.goToAuthPage();
  }

  private async getPermissionToLocation(): Promise<void> {
    await this.geolocation.getCurrentPosition();
  }

  private async getPermissionToCalendar(): Promise<void> {
    await this.calendar.requestReadWritePermission();
  }

  private async getPermissionToCamera(): Promise<void> {
    await Camera.requestPermissions();
  }

  private async goToAuthPage(): Promise<void> {
    await this.navCtrl.navigateRoot([ROUTING_NAME.auth]);
  }
}
