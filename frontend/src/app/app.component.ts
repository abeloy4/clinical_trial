import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { AddDoctorDialogComponent } from './dialogs/add-doctor-dialog/add-doctor-dialog.component';
import { AddParticipantDialogComponent } from './dialogs/add-participant-dialog/add-participant-dialog.component';
import { AddTrialDialogComponent } from './dialogs/add-trial-dialog/add-trial-dialog.component';

import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AppComponent {
  totalDoctors = 0;
  totalParticipants = 0;
  totalTrials = 0;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  // Load counts for doctors, participants, and trials
  loadStatistics(): void {
    this.apiService.getDoctors().subscribe(docs => {
      this.totalDoctors = docs.length;
      console.log('✅ Doctors loaded:', docs);
    });
  
    this.apiService.getParticipants().subscribe(participants => {
      this.totalParticipants = participants.length;
      console.log('✅ Participants loaded:', participants);
    });
  
    this.apiService.getTrials().subscribe({
      next: (trials) => {
        console.log('✅ Trials loaded:', trials);
        this.totalTrials = trials.length;
      },
      error: (err) => console.error('❌ Error loading trials:', err)
    });
  }  

  // Dialog openers
  addDoctor(): void {
    const dialogRef = this.dialog.open(AddDoctorDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New doctor:', result);
        this.apiService.addDoctor(result).subscribe({
          next: (response) => {
            console.log('✅ Doctor added to backend:', response);
            this.loadStatistics(); // optionally reload counts
          },
          error: (err) => {
            console.error('❌ Failed to add doctor:', err);
          }
        });
      }
    });
  }  

  addParticipant(): void {
    const dialogRef = this.dialog.open(AddParticipantDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New participant:', result);
        this.apiService.addParticipant(result).subscribe({
          next: (response) => {
            console.log('✅ Participant added to backend:', response);
            this.loadStatistics(); // optional refresh
          },
          error: (err) => {
            console.error('❌ Failed to add participant:', err);
          }
        });
      }
    });
  }  

  addTrial(): void {
    const dialogRef = this.dialog.open(AddTrialDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New trial:', result);
        this.apiService.addTrial(result).subscribe({
          next: (response) => {
            console.log('✅ Trial added to backend:', response);
            this.loadStatistics(); // refresh stats like totalTrials
          },
          error: (err) => {
            console.error('❌ Failed to add trial:', err);
          }
        });
      }
    });
  }
  

  // Navigation / Utility Actions
  viewAllAppointments(): void {
    // TODO: Implement view all appointments logic
    console.log('View all appointments clicked');
  }

  logout(): void {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  }
}
