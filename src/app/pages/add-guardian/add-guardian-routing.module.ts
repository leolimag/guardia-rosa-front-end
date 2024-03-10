import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGuardianPage } from './add-guardian.page';

const routes: Routes = [
  {
    path: '',
    component: AddGuardianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGuardianPageRoutingModule {}
