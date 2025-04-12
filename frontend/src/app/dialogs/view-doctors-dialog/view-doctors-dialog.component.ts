import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { Doctor } from '../../models/api.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-all-doctors-dialog',
  standalone: true,
  templateUrl: './view-doctors-dialog.component.html',
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  styleUrls: ['./view-doctors-dialog.component.scss']
})
export class ViewAllDoctorsDialogComponent implements OnInit {
  doctors: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<ViewAllDoctorsDialogComponent>,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getDoctors().subscribe({
      next: (res) => {
        this.doctors = Array.isArray(res) ? res : res.$values ?? [];
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}

