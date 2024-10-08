import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { environment } from '../environments/environment.staging';
import { environment } from '../environments/environment.staging';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPatients(obj: any) {
    return this.http.get(`${this.apiUrl}/dental/patients/?search=${obj.search}&page=${obj.page}`)
  }

  addPatient(obj: any){
    return this.http.post(`${this.apiUrl}/dental/patients/`, obj)
  }

  getAllTreatments() {
    return this.http.get(`${this.apiUrl}/dental/get_all_treatments/`).pipe(
      catchError(this.handleError))
  }

  getGrossRevenue() {
    return this.http.get(`${this.apiUrl}/dental/gross_revenue/`)
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something bad happened; please try again later.');
  }

  getRemainingAmount(patientId: number) {
    return this.http.get(`${this.apiUrl}/dental/get_remaining_amount?patient_id=${patientId}`)
  }

  updatePatientFee(obj: any) {
    return this.http.post(`${this.apiUrl}/dental/update_fee/`, obj)
  }
}
