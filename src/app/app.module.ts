import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RevenueComponent } from './revenue/revenue.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PatientBalanceDialogComponent } from './patient-balance-dialog/patient-balance-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './interceptors/token.service';
// import { ChartModule } from 'primeng/chart';
// import { ApiService } from '../api.service';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    AddPatientComponent,
    HeaderComponent,
    FooterComponent,
    PatientListComponent,
    DashboardComponent,
    RevenueComponent,
    PatientBalanceDialogComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule, HttpClientModule, InputTextModule,
    InputNumberModule, DropdownModule, InputSwitchModule, ButtonModule,
    ToastModule, TableModule, BrowserAnimationsModule, CommonModule, CardModule,
    FormsModule, DialogModule
  ],
  providers: [
    provideClientHydration(),
    FormBuilder, Validators, HttpClient, MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
