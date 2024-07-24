import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../assets/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class GetPatientService {

  private API_URL = 'http://localhost:8080/api/patients'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getPatient(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.API_URL}/${patientId}`);
  }
}
