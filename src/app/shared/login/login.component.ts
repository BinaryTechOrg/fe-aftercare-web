import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.errorMessage = null;
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (data) => {
          this.authService.saveToken(data.token, data.refreshToken);
          this.router.navigate(['/dashboard']); // Redirect to the dashboard
        },
        error: (error) => {
          this.errorMessage = 'Invalid credentials or login failed.';
          console.error('Login error:', error);
        }
      });
  }

  get isFormValid(): boolean {
    return this.username.length > 0 && this.password.length > 0;
  }
}
