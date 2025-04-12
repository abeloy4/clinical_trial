import { Component, OnInit } from '@angular/core'; // ✅ Add OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Trial } from '../../models/api.types';
import { ApiService } from '../../services/api.service';

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
export class AddDoctorDialogComponent implements OnInit { // ✅ Implement OnInit

  doctor = {
    fullName: '',
    specialization: '',
    trialId: 0 // ✅ updated from 'trial' to 'trialId'
  };

  availableTrials: Trial[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddDoctorDialogComponent>,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadTrials();
  }

  loadTrials() {
    this.apiService.getTrials().subscribe({
      next: (trials) => {
        this.availableTrials = trials;
        console.log('Loaded trials:', this.availableTrials);
      },
      error: (err) => {
        console.error('Failed to load trials:', err);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.doctor.fullName && this.doctor.specialization && this.doctor.trialId) {
      this.dialogRef.close(this.doctor);
    }
  }
}
