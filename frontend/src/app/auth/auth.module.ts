import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPage } from './auth.page';

import { AuthPageRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AuthPageRoutingModule, ReactiveFormsModule],
  declarations: [AuthPage],
})
export class AuthPageModule {}
