import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/rest/auth.rest';
import { SetUser, UpdateUserPhoto } from '../shared/store/user/user.action';
import { Store } from '@ngxs/store';
import { MenuController, NavController } from '@ionic/angular';
import { ROUTING_NAME } from '../shared/consts/routing.const';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
  ) {}

  public ngOnInit(): void {
    this.authService
      .getProfile()
      .pipe(
        first(),
        switchMap((result) => {
          this.store.dispatch(new SetUser(result));
          return this.authService.getPhotoProfile();
        }),
      )
      .subscribe((result) => {
        const image = btoa(result.Body.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));
        this.store.dispatch(new UpdateUserPhoto(image));
      });
  }

  public async goToProfile(): Promise<void> {
    await this.navCtrl.navigateForward([ROUTING_NAME.home, ROUTING_NAME.profile]);
    await this.menuCtrl.close('first');
  }

  public async goToGroups(): Promise<void> {
    await this.navCtrl.navigateRoot([ROUTING_NAME.home, ROUTING_NAME.groupList]);
    await this.menuCtrl.close('first');
  }

  public async goToFriends(): Promise<void> {
    await this.navCtrl.navigateRoot([ROUTING_NAME.home, ROUTING_NAME.friends]);
    await this.menuCtrl.close('first');
  }
}
