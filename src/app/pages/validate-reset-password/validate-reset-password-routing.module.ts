import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateResetPasswordPage } from './validate-reset-password.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateResetPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateResetPasswordPageRoutingModule {}
