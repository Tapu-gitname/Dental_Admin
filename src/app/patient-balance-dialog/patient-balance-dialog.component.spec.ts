import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBalanceDialogComponent } from './patient-balance-dialog.component';

describe('PatientBalanceDialogComponent', () => {
  let component: PatientBalanceDialogComponent;
  let fixture: ComponentFixture<PatientBalanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientBalanceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientBalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
