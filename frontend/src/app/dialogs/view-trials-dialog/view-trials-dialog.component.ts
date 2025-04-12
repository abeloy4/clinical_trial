import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { Trial } from '../../models/api.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-view-trials-dialog',
  templateUrl: './view-trials-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  styleUrls: ['./view-trials-dialog.component.scss']
})
export class ViewTrialsDialogComponent implements OnInit {
  trials: Trial[] = [];

  constructor(
    private dialogRef: MatDialogRef<ViewTrialsDialogComponent>,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
   // Correct and safe
    this.apiService.getTrials().subscribe({
      next: (res: any) => {
        this.trials = Array.isArray(res) ? res : (res.$values ?? []);
      }
    });   
  }
  close(): void {
    this.dialogRef.close();
  }
}
