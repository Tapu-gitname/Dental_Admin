import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RevenueComponent } from './revenue/revenue.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    // { path: '', component: DashboardComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'  },
    // { path: 'admin', redirectTo: '/admin', pathMatch: 'full'  },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'patients', component: PatientListComponent, canActivate: [AuthGuard] },
    { path: 'revenue', component: RevenueComponent, canActivate: [AuthGuard] },
    { path: 'add-patient', component: AddPatientComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
