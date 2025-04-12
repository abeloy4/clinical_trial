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

export interface ApiAppointment {
  id: number;
  appointmentDate: string;
  notes?: string;
  status: string;
  participantId: number;
  participant: Participant;
}
