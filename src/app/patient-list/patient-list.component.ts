import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';
import { ApiService } from '../api.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit{
  patients: any = []

  displayBalanceDialog: boolean = false;
  selectedPatientId: number | null = null;
  searchQuery: any = '';
  private searchTerms = new Subject<string>();

  showBalanceDialog(patientId: number) {
    this.selectedPatientId = patientId;
    this.displayBalanceDialog = true;
  }

  closeDialog() {
    this.displayBalanceDialog = false; // Reset the dialog visibility when closed
  }

  constructor(private apiService: ApiService) {}

  // ngOnInit(): void {
  //   const obj = {
  //     search: this.searchQuery,
  //     page: 1
  //   }

  //   this.apiService.getPatients(obj).subscribe((data: any) => {
  //     this.patients = data.results;
  //     // console.log(this.patients)
  //   },
  //   (error) => {
  //     console.error('Error fetching series', error);
  //   });
  // }

  ngOnInit(): void {
    // Load initial data
    this.loadPatients({ search: this.searchQuery, page: 1 });
  
    // Watch for search input changes and trigger the search API
    this.searchTerms.pipe(
      debounceTime(300),           // Wait for 300ms pause in events
      distinctUntilChanged(),       // Ignore if the search query is the same as the previous one
      switchMap((term: string) => this.apiService.getPatients({ search: term, page: 1 }))  // Trigger API search
    ).subscribe((data: any) => {
      this.patients = data.results;
    },
    (error) => {
      console.error('Error fetching patients', error);
    });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.searchTerms.next(searchTerm);
  }

  loadPatients(params: any): void {
    this.apiService.getPatients(params).subscribe(
      (data: any) => {
        this.patients = data.results;
      },
      (error) => {
        console.error('Error fetching patients', error);
      }
    );
  }
}
