import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentGroupPageRoutingModule } from './current-group-routing.module';

import { CurrentGroupPage } from './current-group.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CurrentGroupPageRoutingModule],
  declarations: [CurrentGroupPage],
})
export class CurrentGroupPageModule {}
