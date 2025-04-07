import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, Trial, Participant, ApiAppointment } from '../models/api.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Doctors
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<any[]>(`${this.apiUrl}/doctors`);
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<any>(`${this.apiUrl}/doctors`, doctor);
  }

  // Trials
  getTrials(): Observable<Trial[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trials`);
  }

  addTrial(trial: Trial): Observable<Trial> {
    return this.http.post<any>(`${this.apiUrl}/trials`, trial);
  }

  // Participants
  getParticipants(): Observable<Participant[]> {
    return this.http.get<any[]>(`${this.apiUrl}/participants`);
  }

  addParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<any>(`${this.apiUrl}/participants`, participant);
  }

  // Appointments
  getAppointments(): Observable<ApiAppointment[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments`);
  }

  addAppointment(appointment: ApiAppointment): Observable<ApiAppointment> {
    return this.http.post<any>(`${this.apiUrl}/appointments`, appointment);
  }

  updateAppointment(id: number, appointment: ApiAppointment): Observable<ApiAppointment> {
    return this.http.put<any>(`${this.apiUrl}/appointments/${id}`, appointment);
  }
}
