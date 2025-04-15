import { Component, OnInit } from '@angular/core';
import { ApiService, Appointment } from '../services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Doctor, Trial, Participant } from '../models/api.types';
import { ViewDoctorsDialogComponent } from '../dialogs/view-doctors-dialog/view-doctors-dialog.component';
import { ViewParticipantsDialogComponent } from '../dialogs/view-participants-dialog/view-participants-dialog.component';
import { ViewTrialsDialogComponent } from '../dialogs/view-trials-dialog/view-trials-dialog.component';

interface Statistics {
  totalParticipants: number;
  newParticipants: number;
  totalDoctors: number;
  availableDoctors: number;
  activeTrials: number;
  completedTrials: number;
  upcomingAppointments: number;
  nextAppointment: Date;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe, MatDialogModule]
})
export class StatisticsComponent implements OnInit {
  statistics: Statistics = {
    totalParticipants: 0,
    newParticipants: 0,
    totalDoctors: 0,
    availableDoctors: 0,
    activeTrials: 0,
    completedTrials: 0,
    upcomingAppointments: 0,
    nextAppointment: new Date()
  };

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  viewDoctors(): void {
    this.dialog.open(ViewDoctorsDialogComponent, {
      width: '600px',
      maxHeight: '80vh'
    });
  }

  viewParticipants(): void {
    this.dialog.open(ViewParticipantsDialogComponent, {
      width: '600px',
      maxHeight: '80vh'
    });
  }

  viewTrials(): void {
    this.dialog.open(ViewTrialsDialogComponent, {
      width: '600px',
      maxHeight: '80vh'
    });
  }

  private loadStatistics(): void {
    // Load doctors count
    this.apiService.getDoctors().subscribe((doctors: Doctor[]) => {
      this.statistics.totalDoctors = doctors.length;
      // For now, considering all doctors as available
      this.statistics.availableDoctors = doctors.length;
    });

    // Load participants count
    this.apiService.getParticipants().subscribe((participants: Participant[]) => {
      this.statistics.totalParticipants = participants.length;
      // Assuming participants registered in the last 30 days are considered new
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      this.statistics.newParticipants = participants.filter(participant => 
        participant.trial?.startDate && new Date(participant.trial.startDate) >= thirtyDaysAgo
      ).length;
    });

    // Load trials count
    this.apiService.getTrials().subscribe((trials: Trial[]) => {
      const now = new Date();
      this.statistics.activeTrials = trials.filter(trial => {
        const startDate = new Date(trial.startDate);
        const endDate = trial.endDate ? new Date(trial.endDate) : null;
        return startDate <= now && (!endDate || endDate >= now);
      }).length;
      
      this.statistics.completedTrials = trials.filter(trial => {
        const endDate = trial.endDate ? new Date(trial.endDate) : null;
        return endDate && endDate < now;
      }).length;
    });

    // Load appointments
    // this.apiService.getAppointments().subscribe((appointments: Appointment[]) => {
    //   const now = new Date();
    //   const futureAppointments = appointments.filter(appointment => 
    //     new Date(appointment.appointmentDate) > now
    //   );
    //   this.statistics.upcomingAppointments = futureAppointments.length;
      
    //   if (futureAppointments.length > 0) {
    //     this.statistics.nextAppointment = new Date(
    //       Math.min(...futureAppointments.map(appointment => 
    //         new Date(appointment.appointmentDate).getTime()
    //       ))
    //     );
    //   }
    // });
  }
}