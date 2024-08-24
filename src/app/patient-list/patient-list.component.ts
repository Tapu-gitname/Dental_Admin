import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit{
  patients: any = []

  displayBalanceDialog: boolean = false;
  selectedPatientId: number | null = null;

  showBalanceDialog(patientId: number) {
    this.selectedPatientId = patientId;
    this.displayBalanceDialog = true;
  }

  closeDialog() {
    this.displayBalanceDialog = false; // Reset the dialog visibility when closed
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPatients().subscribe((data) => {
      this.patients = data;
      // console.log(this.patients)
    },
    (error) => {
      console.error('Error fetching series', error);
    });
  }
}
