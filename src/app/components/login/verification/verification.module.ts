import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';
import { VerificationComponent } from './verification.component';
import { RouterModule, Routes } from '@angular/router';
import { VerificationGuardService } from './verification-guard.service';

const routes: Routes = [
  {
    path: '',
    component: VerificationComponent,
    canActivate: [VerificationGuardService],
  },
];

@NgModule({
  declarations: [VerificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class VerificationModule {}
