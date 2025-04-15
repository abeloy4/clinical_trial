import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddAppointmentDialogComponent } from '../dialogs/add-appointment-dialog/add-appointment-dialog.component';
import { Appointment, DisplayAppointment } from '../models/api.types';



const APPOINTMENTS_DATA: DisplayAppointment[] = [];

@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  styleUrl: './appointments-table.component.scss',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    DatePipe
  ]
})
export class AppointmentsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['participant', 'trial', 'doctor', 'appointmentDate', 'status'];
  dataSource = new MatTableDataSource<DisplayAppointment>(APPOINTMENTS_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    //private apiService: ApiService
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadAppointments();
  }

  loadAppointments() {
    // Dummy appointments data
    const appointments: DisplayAppointment[] = [
      {
        participant: { fullName: 'John Smith' },
        trial: { name: 'Cancer Treatment Trial' },
        doctor: { fullName: 'Dr. Sarah Wilson' },
        appointmentDate: new Date('2025-04-15T10:00:00'),
        status: 'scheduled'
      },
      {
        participant: { fullName: 'Mary Johnson' },
        trial: { name: 'Diabetes Study' },
        doctor: { fullName: 'Dr. Michael Brown' },
        appointmentDate: new Date('2025-04-16T14:30:00'),
        status: 'scheduled'
      },
      {
        participant: { fullName: 'Robert Davis' },
        trial: { name: 'Heart Disease Trial' },
        doctor: { fullName: 'Dr. Emily Chen' },
        appointmentDate: new Date('2025-04-17T09:15:00'),
        status: 'scheduled'
      },
      {
        participant: { fullName: 'Patricia Miller' },
        trial: { name: 'Arthritis Study' },
        doctor: { fullName: 'Dr. James Taylor' },
        appointmentDate: new Date('2025-04-18T11:45:00'),
        status: 'scheduled'
      },
      {
        participant: { fullName: 'Michael Wilson' },
        trial: { name: 'Alzheimer Study' },
        doctor: { fullName: 'Dr. Lisa Anderson' },
        appointmentDate: new Date('2025-04-19T13:00:00'),
        status: 'scheduled'
      }
    ];

    this.dataSource.data = appointments;
  }

  openAddAppointmentDialog() {
    const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAppointments();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
