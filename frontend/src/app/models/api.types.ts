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
