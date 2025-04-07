import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddDoctorDialogComponent } from './dialogs/add-doctor-dialog/add-doctor-dialog.component';
import { AddParticipantDialogComponent } from './dialogs/add-participant-dialog/add-participant-dialog.component';
import { AddTrialDialogComponent } from './dialogs/add-trial-dialog/add-trial-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AppComponent {
  // Mock data - replace with actual data from your service
  totalDoctors = 12;
  totalParticipants = 156;
  totalTrials = 8;

  recentAppointments = [
    {
      date: new Date('2025-04-02T10:00:00'),
      patientName: 'John Smith',
      doctorName: 'Sarah Wilson',
      trialName: 'Cancer Research Trial A',
      status: 'upcoming'
    },
    {
      date: new Date('2025-04-02T14:30:00'),
      patientName: 'Emma Johnson',
      doctorName: 'Michael Brown',
      trialName: 'Diabetes Treatment Study',
      status: 'upcoming'
    },
    {
      date: new Date('2025-04-03T09:15:00'),
      patientName: 'Robert Davis',
      doctorName: 'Jennifer Lee',
      trialName: 'Cardiovascular Trial B',
      status: 'upcoming'
    },
    {
      date: new Date('2025-04-03T11:45:00'),
      patientName: 'Maria Garcia',
      doctorName: 'David Chen',
      trialName: 'Alzheimer\'s Research',
      status: 'upcoming'
    }
  ];

  constructor(private dialog: MatDialog) {}

  addDoctor() {
    const dialogRef = this.dialog.open(AddDoctorDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New doctor:', result);
        // TODO: Implement actual doctor creation
      }
    });
  }

  addParticipant() {
    const dialogRef = this.dialog.open(AddParticipantDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New participant:', result);
        // TODO: Implement actual participant creation
      }
    });
  }

  addTrial() {
    const dialogRef = this.dialog.open(AddTrialDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New trial:', result);
        // TODO: Implement actual trial creation
      }
    });
  }

  viewAllAppointments() {
    // TODO: Implement view all appointments
    console.log('View all appointments clicked');
  }

  logout() {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  }
}
