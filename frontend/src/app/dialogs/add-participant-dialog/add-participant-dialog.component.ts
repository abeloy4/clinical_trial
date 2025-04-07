import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface DoctorTrial {
  doctorId: string;
  doctorName: string;
  trial: {
    id: string;
    title: string;
  };
}

@Component({
  selector: 'app-add-participant-dialog',
  templateUrl: './add-participant-dialog.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AddParticipantDialogComponent {
  participant = {
    fullName: '',
    doctorTrialId: ''
  };

  // Mock data - replace with actual data from your service
  availableDoctorTrials: DoctorTrial[] = [
    {
      doctorId: '1',
      doctorName: 'Dr. Sarah Wilson',
      trial: { id: '1', title: 'Cancer Research Trial A' }
    },
    {
      doctorId: '2',
      doctorName: 'Dr. Michael Brown',
      trial: { id: '2', title: 'Diabetes Treatment Study' }
    },
    {
      doctorId: '3',
      doctorName: 'Dr. Jennifer Lee',
      trial: { id: '3', title: 'Cardiovascular Trial B' }
    }
  ];

  constructor(private dialogRef: MatDialogRef<AddParticipantDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.participant.fullName && this.participant.doctorTrialId) {
      this.dialogRef.close(this.participant);
    }
  }
}
