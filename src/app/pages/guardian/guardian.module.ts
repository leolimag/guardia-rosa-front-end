import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuardianPageRoutingModule } from './guardian-routing.module';

import { GuardianPage } from './guardian.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuardianPageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [GuardianPage]
})
export class GuardianPageModule {}
