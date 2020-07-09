import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomePageRoutingModule, SharedModule],
})
export class HomePageModule {}