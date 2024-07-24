import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletePatientService {

  private API_URL = 'http://localhost:8080/api/patients'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  deletePatient(patientId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${patientId}`);
  }
}
