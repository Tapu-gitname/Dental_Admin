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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPatients().subscribe((data) => {
      this.patients = data;
    },
    (error) => {
      console.error('Error fetching series', error);
    });
  }
}
