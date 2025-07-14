import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Service } from '../../../Services/Product/service';
import { AuthService } from '../../../Services/Signup&login/auth-service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css'],
})
export class Signin {
  email: string = '';
  password: string = '';
  passwordMsg: string = '';
  usernameMsg: string = '';

  constructor(private router: Router, private service: AuthService) {}

  loginSeller(): void {
    if (this.email && this.password) {
      let sellerDetails = {
        email: this.email,
        password: this.password,
      };

      console.log(sellerDetails);

      this.service.loginUser(sellerDetails).subscribe(
        (response: any) => {
          console.log(response.token);

          if (response.token) {
            // Store token
            localStorage.setItem('token', response.token);
            localStorage.setItem('name', response.name);
            localStorage.setItem('role', response.role);
            localStorage.setItem('id', response.id);

            // Navigate after login
           if(response.role=="seller"){
             this.router.navigate(['/seller-dashboard']);
           }else if(response.role=="admin"){
             this.router.navigate(['']);
           }else{
             this.router.navigate(['']);
           }
          } else {
            alert('Login failed. Please check your credentials.');
          }
        },
        (error) => {
          console.error('Login error:', error);
          alert('Invalid credentials or server error.');
        }
      );
    } else {
      alert('All fields are required.');
    }
  }
}
