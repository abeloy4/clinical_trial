import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
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
export class AddDoctorDialogComponent {
  doctor = {
    fullName: '',
    specialization: '',
    trial: ''
  };

  // Mock trials data - replace with actual data from your service
  availableTrials = [
    { id: '1', title: 'Cancer Research Trial A' },
    { id: '2', title: 'Diabetes Treatment Study' },
    { id: '3', title: 'Cardiovascular Trial B' },
    { id: '4', title: 'Alzheimer\'s Research' }
  ];

  constructor(private dialogRef: MatDialogRef<AddDoctorDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.doctor.fullName && this.doctor.specialization && this.doctor.trial) {
      this.dialogRef.close(this.doctor);
    }
  }
}
