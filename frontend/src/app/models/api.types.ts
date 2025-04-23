export interface Doctor {
  id: number;
  fullName: string;
  specialization: string;
}

export interface Trial {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: string;
}

export interface Participant {
  id: number;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  medicalHistory?: string;
  doctorId: number;
  doctor: Doctor;
  trialId: number;
  trial: Trial;
}
export interface Appointment {
  id: number;
  appointmentDate: string;
  notes?: string;
  status: string;
  participantId: number;
  participant: Participant;
  doctorId: number;
  doctor: Doctor;
  trialId: number;
  trial: Trial;
}
export interface DisplayAppointment {
  participant: { fullName: string };
  trial: { name: string };
  doctor: { fullName: string };
  appointmentDate: Date;
  status: string;
}
export interface AppointmentDTO {
  id?: number; // optional during creation
  appointmentDate: string;
  notes?: string;
  status: string;
  participantId: number;
  doctorId: number;
  trialId: number;
}
export interface AppointmentViewDTO {
  id: number;
  appointmentDate: string;
  notes?: string;
  status: string;
  participantId: number;
  participantName: string;
  doctorId: number;
  doctorName: string;
  trialId: number;
  trialName: string;
}

  
