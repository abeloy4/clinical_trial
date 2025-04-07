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

export interface Appointment {
  participant: string;
  trial: string;
  doctor: string;
  date: Date;
  status: string;
}

const APPOINTMENTS_DATA: Appointment[] = [
  { participant: 'John Smith', trial: 'Diabetes Type 2', doctor: 'Dr. Sarah Wilson', date: new Date('2025-04-01'), status: 'Scheduled' },
  { participant: 'Emma Davis', trial: 'Cardiovascular Study', doctor: 'Dr. Michael Chen', date: new Date('2025-04-02'), status: 'Confirmed' },
  { participant: 'Robert Brown', trial: 'Arthritis Trial', doctor: 'Dr. Emily Taylor', date: new Date('2025-04-03'), status: 'Pending' },
  { participant: 'Maria Garcia', trial: 'Cancer Research', doctor: 'Dr. James Wilson', date: new Date('2025-04-04'), status: 'Cancelled' },
  { participant: 'David Lee', trial: 'Diabetes Type 2', doctor: 'Dr. Sarah Wilson', date: new Date('2025-04-05'), status: 'Scheduled' }
];

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
    DatePipe
  ]
})
export class AppointmentsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['participant', 'trial', 'doctor', 'date', 'status'];
  dataSource = new MatTableDataSource<Appointment>(APPOINTMENTS_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
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
