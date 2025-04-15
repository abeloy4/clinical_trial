import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, Trial, Participant, Appointment } from '../models/api.types';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Doctors
  getDoctors() {
    return this.http.get<any>(`${this.apiUrl}/doctors`).pipe(
      map(res => Array.isArray(res) ? res : res.$values ?? [])
    );
  }

  addDoctor(doctor: any) {
    return this.http.post(`${this.apiUrl}/doctors`, doctor);
  }

  deleteDoctor(id: number) {
    return this.http.delete(`${this.apiUrl}/doctors/${id}`);
  }

  deleteParticipant(id: number) {
    return this.http.delete(`${this.apiUrl}/participants/${id}`);
  }

  // Trials
  getTrials(): Observable<Trial[]> {
    return this.http.get<any>(`${this.apiUrl}/trials`).pipe(
      map(res => Array.isArray(res) ? res : res.$values ?? [])
    );
  }

  addTrial(trial: Trial): Observable<Trial> {
    return this.http.post<any>(`${this.apiUrl}/trials`, trial);
  }

  deleteTrial(id: number) {
    return this.http.delete(`${this.apiUrl}/trials/${id}`);
  }

  // Participants
  getParticipants() {
    return this.http.get<any>(`${this.apiUrl}/participants`).pipe(
      map(res => Array.isArray(res) ? res : res.$values ?? [])
    );
  }

  addParticipant(participant: any) {
    return this.http.post(`${this.apiUrl}/participants`, participant);
  }

  // Appointments
  // getAppointments(): Observable<ApiAppointment[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/appointments`);
  // }

  
  getAppointments() {
    return this.http.get<any>(`${this.apiUrl}/appointments`).pipe(
      map(res => Array.isArray(res) ? res : res.$values ?? [])
    );
  }
  
  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<any>(`${this.apiUrl}/appointments`, appointment);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<any>(`${this.apiUrl}/appointments/${id}`, appointment);
  }
}
