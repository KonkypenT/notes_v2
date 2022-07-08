import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { COMPONENTS } from './components';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, IonicModule, HttpClientModule],
  providers: [],
  exports: [...COMPONENTS],
})
export class SharedModule {}
