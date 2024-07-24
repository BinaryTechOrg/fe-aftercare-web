import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {

  private API_URL = 'http://localhost:8080/api/patients/register'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  addPatient(patientDTO: any): Observable<void> {
    return this.http.post<void>(this.API_URL, patientDTO);
  }
}
