import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupListPageRoutingModule } from './group-list-routing.module';

import { GroupListPage } from './group-list.page';
import { SharedModule } from '../../shared/shared.module';
import { InfoAboutGroupComponent } from './info-about-group/info-about-group.component';

const components = [InfoAboutGroupComponent];

@NgModule({
  imports: [CommonModule, IonicModule, GroupListPageRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [GroupListPage, ...components],
})
export class GroupListPageModule {}
