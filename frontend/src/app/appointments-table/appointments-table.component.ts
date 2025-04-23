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
import { ApiService } from '../services/api.service';
import { AppointmentViewDTO } from '../models/api.types';




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
  displayedColumns: string[] = ['participantName', 'trialName', 'doctorName', 'appointmentDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<AppointmentViewDTO>([]);
  //dataSource = new MatTableDataSource<DisplayAppointment>(APPOINTMENTS_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadAppointments();
  }

  //isLoading = true;


  loadAppointments() {
    this.apiService.getAppointments().subscribe({
      next: (appointments) => {
        console.log('Fetched appointments:', appointments);
        this.dataSource.data = appointments;
      },
      error: (err) => {
        console.error('Failed to load appointments', err);
      }
    }); 
  }
  editAppointment(appointment: AppointmentViewDTO): void {
    console.log('Edit appointment:', appointment);
    // You'll open a dialog here later
  }
  
  deleteAppointment(id: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.apiService.deleteAppointment(id).subscribe({
        next: () => {
          console.log('Appointment deleted');
          this.loadAppointments(); // Refresh table
        },
        error: (err) => {
          console.error('Failed to delete appointment', err);
        }
      });
    }
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
