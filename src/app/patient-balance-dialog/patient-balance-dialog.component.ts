import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';

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
  // obj: any;

  constructor(private http: HttpClient, private service: ApiService, private messageService: MessageService) {}

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
    const obj = {
      'patient': this.patientId,
      'amount_paid': this.amountPaid
    }
    this.service.updatePatientFee(obj).subscribe({
      next: (res: any) => { // or specify the exact type if known
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Patient fee updated successfully'});
      },
      error: (error: any) => { // or specify the exact type if known
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to update patient fee'});
      }
  });

    this.closeDialog();
  }

  // Close the dialog and emit the updated display state
  closeDialog() {
    this.display = false;
    this.displayChange.emit(this.display);
    this.onClose.emit();
  }
}
