import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupListPageRoutingModule } from './group-list-routing.module';

import { GroupListPage } from './group-list.page';
import { SharedModule } from '../../shared/shared.module';
import { InfoAboutGroupComponent } from './info-about-group/info-about-group.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { AddEventComponent } from './add-event/add-event.component';
import { InfoAboutEventComponent } from './info-about-event/info-about-event.component';
import { ModalMapComponent } from './modal-map/modal-map.component';

const components = [
  InfoAboutGroupComponent,
  AddMemberComponent,
  CreateGroupComponent,
  AddEventComponent,
  InfoAboutEventComponent,
  ModalMapComponent,
];

@NgModule({
  imports: [CommonModule, IonicModule, GroupListPageRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [GroupListPage, ...components],
})
export class GroupListPageModule {}
