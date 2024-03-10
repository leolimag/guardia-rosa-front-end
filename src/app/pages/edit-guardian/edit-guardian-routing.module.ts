import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGuardianPage } from './edit-guardian.page';

const routes: Routes = [
  {
    path: '',
    component: EditGuardianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGuardianPageRoutingModule {}
