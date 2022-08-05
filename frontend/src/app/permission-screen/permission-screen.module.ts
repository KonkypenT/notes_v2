import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionScreenPageRoutingModule } from './permission-screen-routing.module';

import { PermissionScreenPage } from './permission-screen.page';
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PermissionScreenPageRoutingModule],
  declarations: [PermissionScreenPage],
  providers: [Calendar],
})
export class PermissionScreenPageModule {}
