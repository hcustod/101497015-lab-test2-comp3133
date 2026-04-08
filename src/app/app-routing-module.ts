import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Missiondetails } from './missiondetails/missiondetails';
import { Missionlist } from './missionlist/missionlist';

const routes: Routes = [
  { path: '', redirectTo: 'missions', pathMatch: 'full' },
  { path: 'missions', component: Missionlist },
  { path: 'missions/:flightNumber', component: Missiondetails },
  { path: '**', redirectTo: 'missions' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
