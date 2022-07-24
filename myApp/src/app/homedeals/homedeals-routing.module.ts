import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomedealsPage } from './homedeals.page';

const routes: Routes = [
  {
    path: '',
    component: HomedealsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomedealsPageRoutingModule {}
