import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationsToMePage } from './applications-to-me.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsToMePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsToMePageRoutingModule {}
