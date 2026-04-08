import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Missiondetails } from './missiondetails/missiondetails';
import { Missionlist } from './missionlist/missionlist';

const routes: Routes = [
  // Default route redirects to missions list
  { path: '', redirectTo: 'missions', pathMatch: 'full' },
  // Route for missions list
  { path: 'missions', component: Missionlist },
  // Route for mission details with flight number as param
  { path: 'missions/:flightNumber', component: Missiondetails },
  // catchall for any unkown routes
  { path: '**', redirectTo: 'missions' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
