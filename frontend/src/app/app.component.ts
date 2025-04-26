import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { AddDoctorDialogComponent } from './dialogs/add-doctor-dialog/add-doctor-dialog.component';
import { AddParticipantDialogComponent } from './dialogs/add-participant-dialog/add-participant-dialog.component';
import { AddTrialDialogComponent } from './dialogs/add-trial-dialog/add-trial-dialog.component';

import { ApiService } from './services/api.service';
import { ViewAllDoctorsDialogComponent } from './dialogs/view-doctors-dialog/view-doctors-dialog.component';
import { ViewParticipantsDialogComponent } from './dialogs/view-participants-dialog/view-participants-dialog.component';
import { ViewTrialsDialogComponent } from './dialogs/view-trials-dialog/view-trials-dialog.component';
import { AppointmentsTableComponent } from './appointments-table/appointments-table.component';
import { AddAppointmentDialogComponent } from './dialogs/add-appointment-dialog/add-appointment-dialog.component';
import { AppointmentDTO } from './models/api.types';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    AppointmentsTableComponent,

  ]
})
export class AppComponent {
  totalDoctors = 0;
  totalParticipants = 0;
  totalTrials = 0;
  recentAppointments: any[] = [];

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadRecentAppointments();
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

  // Load recent appointments
  loadRecentAppointments(): void {
    this.apiService.getAppointments().subscribe({
      next: (appointments) => {
        const sorted = [...appointments].sort((a, b) =>
          new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
        );
    
        this.recentAppointments = sorted.slice(0, 4).map(a => ({
          date: new Date(a.appointmentDate),
          patientName: a.participantName,
          doctorName: a.doctorName,
          trialName: a.trialName,
          status: a.status
        }));
      },
      error: (err) => {
        console.error('Failed to load recent appointments', err);
      }
    });    
  }

  viewAllAppointments(): void {
    this.dialog.open(AppointmentsTableComponent, {
      width: '900px',
      height: '80vh',
      panelClass: 'custom-dialog',
      autoFocus: false
    });
  }
  
  scheduleAppointment(): void {
    const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = result;

        const date = new Date(formData.appointmentDate);
        const [hours, minutes] = formData.appointmentTime.split(':');
        date.setHours(+hours, +minutes, 0, 0);

        
        const localISOString = date.getFullYear() + '-' +
          String(date.getMonth() + 1).padStart(2, '0') + '-' +
          String(date.getDate()).padStart(2, '0') + 'T' +
          String(date.getHours()).padStart(2, '0') + ':' +
          String(date.getMinutes()).padStart(2, '0') + ':00';

        const newAppointment: AppointmentDTO = {
          appointmentDate: localISOString,
          appointmentTime: formData.appointmentTime,
          notes: formData.notes || '',
          status: 'scheduled',
          participantId: formData.participantId,
          doctorId: formData.doctorId,
          trialId: formData.trialId
      };
  
        console.log('Sending appointment:', newAppointment);
        this.apiService.addAppointment(newAppointment).subscribe({
          next: (res) => {
            console.log('Appointment created:', res);
            this.loadRecentAppointments(); // Reload table with new data
          },
          error: (err) => {
            console.error('Failed to create appointment', err);
          }
        });
      }
    });
  
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Add the new appointment to recent appointments
    //     const newAppointment = {
    //       date: new Date(result.appointmentDate),
    //       patientName: this.findParticipantName(result.participantId),
    //       doctorName: this.findDoctorName(result.doctorId),
    //       trialName: 'Trial Name', // You would normally get this from the form
    //       status: 'scheduled'
    //     };
    //     this.recentAppointments = [newAppointment, ...this.recentAppointments.slice(0, 3)];
    //   }
    // });
  }
  
  private findParticipantName(id: number): string {
    // This would normally lookup the participant name from your data
    return 'New Patient';
  }
  
  private findDoctorName(id: number): string {
    // This would normally lookup the doctor name from your data
    return 'New Doctor';
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

  viewDoctors(): void {
    this.dialog.open(ViewAllDoctorsDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });
  }

  viewParticipants(): void {
    this.dialog.open(ViewParticipantsDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });
  }

  viewTrials(): void {
    this.dialog.open(ViewTrialsDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });
  }
  

  
  // Navigation / Utility Actions


  logout(): void {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  }
}
