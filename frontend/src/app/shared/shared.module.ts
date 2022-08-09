import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { COMPONENTS } from './components';
import { CommonModule } from '@angular/common';
import { PIPES } from './pipes';

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [CommonModule, IonicModule, HttpClientModule],
  providers: [],
  exports: [...COMPONENTS, ...PIPES],
})
export class SharedModule {}
