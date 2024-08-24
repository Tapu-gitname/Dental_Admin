import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patient-balance-dialog',
  templateUrl: './patient-balance-dialog.component.html',
  styleUrl: './patient-balance-dialog.component.css'
})
export class PatientBalanceDialogComponent {
  // Define the input property for the display state
  @Input() display: boolean = false;
  @Input() patientId: number | null = null;

  // Define the output event emitter for changes to the display state
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();

  amountPaid: number = 0;
  remainingAmount: number = 0;

  constructor(private http: HttpClient, private service: ApiService) {}

  ngOnChanges() {
    if (this.patientId && this.display) {
      this.fetchRemainingAmount(this.patientId);
    }
  }

  fetchRemainingAmount(patientId: number) {
    this.service.getRemainingAmount(patientId)
      .subscribe(
        (response: any) => {
          this.remainingAmount = response.remaining_amount;
        },
        (error: any) => {
          console.error('Error fetching remaining amount:', error);
        }
      );
  }

  // Handle the Save button click event
  save() {
    // Logic to save the amount paid can be added here.
    this.closeDialog();
  }

  // Close the dialog and emit the updated display state
  closeDialog() {
    this.display = false;
    this.displayChange.emit(this.display);
    this.onClose.emit();
  }
}
