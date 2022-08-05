import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionScreenPage } from './permission-screen.page';

const routes: Routes = [
  {
    path: '',
    component: PermissionScreenPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionScreenPageRoutingModule {}
