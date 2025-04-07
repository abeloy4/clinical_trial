import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AppointmentsTableComponent } from './appointments-table/appointments-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentsTableComponent },
  { path: 'add', component: AddEntryComponent },
  { path: 'statistics', component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
