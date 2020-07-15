import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { VerificationComponent } from './verification.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: VerificationComponent }];

@NgModule({
  declarations: [VerificationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class VerificationModule {}
