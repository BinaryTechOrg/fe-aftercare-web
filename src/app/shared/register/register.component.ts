import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../../assets/models/patient.model';
import { PatientService } from '../../Services/Patient.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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

  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private patientService: PatientService, private router: Router) { }

  register() {
    this.errorMessage = null;
    this.patientService.addPatient(this.patient).subscribe({
      next: () => {
        console.log("Patient registered successfully");
        // Optionally, redirect to login or another page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    });
  }

  isFormValid(): boolean {
    // Implement your form validation logic here
    // For simplicity, just check if all required fields are filled
    return (
      this.patient.firstName.trim() !== '' &&
      this.patient.lastName.trim() !== '' &&
      this.patient.email.trim() !== '' &&
      this.patient.password.trim() !== '' &&
      this.patient.phone.trim() !== '' &&
      this.patient.address.city.trim() !== '' &&
      this.patient.address.state.trim() !== '' &&
      this.patient.address.zip.trim() !== ''
    );
  }
}
