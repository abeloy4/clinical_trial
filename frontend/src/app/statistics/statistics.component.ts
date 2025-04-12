import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Doctor, Trial, Participant, ApiAppointment } from '../models/api.types';

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
  imports: [CommonModule, DatePipe]
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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStatistics();
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
    this.apiService.getAppointments().subscribe((appointments: ApiAppointment[]) => {
      const now = new Date();
      const futureAppointments = appointments.filter(appointment => 
        new Date(appointment.appointmentDate) > now
      );
      this.statistics.upcomingAppointments = futureAppointments.length;
      
      if (futureAppointments.length > 0) {
        this.statistics.nextAppointment = new Date(
          Math.min(...futureAppointments.map(appointment => 
            new Date(appointment.appointmentDate).getTime()
          ))
        );
      }
    });
  }
}