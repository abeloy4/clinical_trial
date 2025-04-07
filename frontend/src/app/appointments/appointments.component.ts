import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Appointment {
  id: number;
  participantName: string;
  trial: string;
  doctor: string;
  date: Date;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';
}

const SAMPLE_DATA: Appointment[] = [
  { id: 1, participantName: 'John Smith', trial: 'Diabetes Type 2 Study', doctor: 'Dr. Sarah Wilson', date: new Date('2025-04-01'), status: 'Scheduled' },
  { id: 2, participantName: 'Emma Johnson', trial: 'Cardiovascular Health', doctor: 'Dr. Michael Chen', date: new Date('2025-04-02'), status: 'Scheduled' },
  { id: 3, participantName: 'Robert Brown', trial: 'Arthritis Treatment', doctor: 'Dr. Emily Taylor', date: new Date('2025-04-01'), status: 'Cancelled' },
  { id: 4, participantName: 'Maria Garcia', trial: 'Diabetes Type 2 Study', doctor: 'Dr. Sarah Wilson', date: new Date('2025-04-03'), status: 'Scheduled' },
  { id: 5, participantName: 'William Lee', trial: 'Mental Health Study', doctor: 'Dr. James Anderson', date: new Date('2025-03-31'), status: 'Completed' },
];

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['participantName', 'trial', 'doctor', 'date', 'status'];
  dataSource: MatTableDataSource<Appointment>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<Appointment>([]);
  }

  loadAppointments() {
    this.apiService.getAppointments().subscribe(appointments => {
      const formattedAppointments = appointments.map(apt => ({
        id: apt.id,
        participantName: apt.participant.fullName,
        trial: apt.participant.trial.title,
        doctor: apt.participant.doctor.fullName,
        date: new Date(apt.appointmentDate),
        status: apt.status as 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show'
      }));
      
      this.dataSource.data = formattedAppointments;
    });
  }

  ngOnInit() {
    this.loadAppointments();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
