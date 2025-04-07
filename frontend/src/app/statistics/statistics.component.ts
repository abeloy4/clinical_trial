import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

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
  styleUrl: './statistics.component.scss',
  standalone: true,
  imports: [DatePipe]
})
export class StatisticsComponent {
  statistics: Statistics = {
    totalParticipants: 1250,
    newParticipants: 48,
    totalDoctors: 45,
    availableDoctors: 32,
    activeTrials: 23,
    completedTrials: 18,
    upcomingAppointments: 156,
    nextAppointment: new Date('2025-04-01')
  };
}
