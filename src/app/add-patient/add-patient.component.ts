import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css',
  providers: [MessageService]
})
export class AddPatientComponent {
  patientForm!: FormGroup;
  sexOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'O' }
  ];
  treatmentOptions: any;
  model: any;
  // treatmentOptions = [
  //   { label: 'Treatment A', value: 'treatmentA' },
  //   { label: 'Treatment B', value: 'treatmentB' },
  //   { label: 'Treatment C', value: 'treatmentC' }
  // ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    // private messageService: MessageService,
    private apiService: ApiService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      sex: ['', Validators.required],
      treatment: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]],
      status: [false]
    });

    this.apiService.getAllTreatments().subscribe(data => {
      this.treatmentOptions = data;
    })
  }

  onSubmit() {
    this.model = this.patientForm.value;
    // this.model['treatment'] = 
    // if (this.patientForm.valid) {
        this.apiService.addPatient(this.patientForm.value).subscribe({
            next: (res: any) => { // or specify the exact type if known
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Patient added successfully'});
                this.patientForm.reset();
            },
            error: (error: any) => { // or specify the exact type if known
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to add patient'});
            }
        });
    // }
}
}
