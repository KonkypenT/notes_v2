import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { CheckProfileGuard } from '../shared/guards/check-profile.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [CheckProfileGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
