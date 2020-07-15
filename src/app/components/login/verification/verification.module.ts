import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { VerificationComponent } from './verification.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthResolver } from '../auth.resolver';

const routes: Routes = [
  {
    path: '',
    component: VerificationComponent,
    resolve: { auth: AuthResolver },
  },
];

@NgModule({
  declarations: [VerificationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [AuthResolver],
})
export class VerificationModule {}
