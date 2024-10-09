import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // AuthService to handle API calls
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {debugger;
        console.log("response =====>", response)
        this.loading = false;
        if (response.access) {
          this.authService.setSession(response);
          this.router.navigate(['/patients']);
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Invalid username or password.';
      }
    );
  }
}
