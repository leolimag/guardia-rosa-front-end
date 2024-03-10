import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGuardianPageRoutingModule } from './add-guardian-routing.module';

import { AddGuardianPage } from './add-guardian.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGuardianPageRoutingModule,
    SharedModule
  ],
  declarations: [AddGuardianPage]
})
export class AddGuardianPageModule {}
