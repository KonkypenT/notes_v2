import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentGroupPage } from './current-group.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentGroupPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentGroupPageRoutingModule {}
