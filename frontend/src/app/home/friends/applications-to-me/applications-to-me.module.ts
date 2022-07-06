import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationsToMePageRoutingModule } from './applications-to-me-routing.module';

import { ApplicationsToMePage } from './applications-to-me.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ApplicationsToMePageRoutingModule],
  declarations: [ApplicationsToMePage],
})
export class ApplicationsToMePageModule {}
