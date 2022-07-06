import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFriendsPageRoutingModule } from './my-friends-routing.module';

import { MyFriendsPage } from './my-friends.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MyFriendsPageRoutingModule],
  declarations: [MyFriendsPage],
})
export class MyFriendsPageModule {}
