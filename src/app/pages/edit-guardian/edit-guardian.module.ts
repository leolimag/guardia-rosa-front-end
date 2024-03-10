import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGuardianPageRoutingModule } from './edit-guardian-routing.module';

import { EditGuardianPage } from './edit-guardian.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditGuardianPageRoutingModule,
    SharedModule
  ],
  declarations: [EditGuardianPage]
})
export class EditGuardianPageModule {}
