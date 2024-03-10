import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateResetPasswordPageRoutingModule } from './validate-reset-password-routing.module';

import { ValidateResetPasswordPage } from './validate-reset-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidateResetPasswordPageRoutingModule
  ],
  declarations: [ValidateResetPasswordPage]
})
export class ValidateResetPasswordPageModule {}
