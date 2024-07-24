import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../Services/Patient.service';
import { Patient } from '../../../assets/models/patient.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  patient: Patient = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gender: 'male', // Default gender
    address: {
      city: '',
      state: '',
      zip: ''
    }
  };
  errorMessage: string | null = null;
  patients: Patient[] = [];

  constructor(private router: Router, private patientService: PatientService) { }

  ngOnInit() {
    this.loadPatients();
  }

  addPatient() {
    this.errorMessage = null;
    this.patientService.addPatient(this.patient)
      .subscribe({
        next: () => {
          console.log('Patient added successfully!');
          this.loadPatients(); // Reload patient list after adding
        },
        error: (error) => {
          this.errorMessage = 'Error adding patient.';
          console.error('Add patient error:', error);
        }
      });
  }

  loadPatients() {
    this.patientService.getPatientList()
      .subscribe({
        next: (patients) => {
          this.patients = patients;
        },
        error: (error) => {
          console.error('Fetch patients error:', error);
        }
      });
  }

  deletePatient(patientId: number | undefined) {
    if (patientId !== undefined) {
      this.patientService.deletePatient(patientId)
        .subscribe({
          next: () => {
            console.log('Patient deleted successfully!');
            this.loadPatients(); // Reload patient list after deleting
          },
          error: (error) => {
            console.error('Delete patient error:', error);
          }
        });
    } else {
      // Handle the case where patientId is undefined
      console.error('Patient ID is undefined');
    }
  }
  

  isFormValid(): boolean {
    // Implement your form validation logic here
    // For simplicity, just check if all required fields are filled
    return (
      this.patient.firstName.trim() !== '' &&
      this.patient.lastName.trim() !== '' &&
      this.patient.email.trim() !== '' &&
      this.patient.phone.trim() !== '' &&
      this.patient.address.city.trim() !== '' &&
      this.patient.address.state.trim() !== '' &&
      this.patient.address.zip.trim() !== ''
    );
  }
}
