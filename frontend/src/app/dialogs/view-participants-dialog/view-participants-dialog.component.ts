import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { Participant } from '../../models/api.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-participants-dialog',
  templateUrl: './view-participants-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  styleUrls: ['./view-participants-dialog.component.scss']
})
export class ViewParticipantsDialogComponent implements OnInit {
  participants: Participant[] = [];

  constructor(
    private dialogRef: MatDialogRef<ViewParticipantsDialogComponent>,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getParticipants().subscribe({
      next: (res) => {
        this.participants = Array.isArray(res) ? res : res.$values ?? [];
      }
    });
  }


  close(): void {
    this.dialogRef.close();
  }
}
