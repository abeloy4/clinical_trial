import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ApiService } from '../../services/api.service';
import { Doctor, Participant } from '../../models/api.types';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule
  ]
})
export class AddAppointmentDialogComponent implements OnInit {
  appointmentForm!: FormGroup;
  participants: Participant[] = [];
  doctors: Doctor[] = [];
  minDate: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<AddAppointmentDialogComponent>,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      appointmentDate: ['', Validators.required],
      location: [''],
      participantId: ['', Validators.required],
      doctorId: ['', Validators.required],
      notes: ['']
    });

    this.apiService.getParticipants().subscribe({
      next: (res) => {
        this.participants = Array.isArray(res) ? res : res.$values ?? [];
      },
      error: (err) => {
        console.error('Error loading participants:', err);
      }
    });

    this.apiService.getDoctors().subscribe({
      next: (res) => {
        this.doctors = Array.isArray(res) ? res : res.$values ?? [];
      },
      error: (err) => {
        console.error('Error loading doctors:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointment = this.appointmentForm.value;
      this.dialogRef.close(appointment);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
