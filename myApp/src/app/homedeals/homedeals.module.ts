import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomedealsPageRoutingModule } from './homedeals-routing.module';

import { HomedealsPage } from './homedeals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomedealsPageRoutingModule
  ],
  declarations: [HomedealsPage]
})
export class HomedealsPageModule {}
