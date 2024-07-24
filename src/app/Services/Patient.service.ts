import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../assets/models/patient.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private API_URL = 'http://localhost:8080/api/patients'; // Replace with your backend API URL

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  addPatient(patient: Patient): Observable<void> {
    console.log("called")
    return this.http.post<void>(`${this.API_URL}/register`, patient);
    console.log("addpatient")
  }

  getPatientList(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.API_URL);
  }

  getPatient(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.API_URL}/${patientId}`);
  }

  deletePatient(patientId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${patientId}`);
  }
}
