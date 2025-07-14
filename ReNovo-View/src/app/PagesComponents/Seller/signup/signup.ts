import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../../../Services/Signup&login/auth-service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup {
  constructor(private router: Router, private service: AuthService) {}

  name: string = '';
  email: string = '';
  password: string = '';
  contact: string = '';
  address: string = '';
  confirmPassword: string = '';
  role: string = '';
  msg: string = '*Required';

  handleSignup(): void {
    if (this.contact.length !== 10) {
      alert("Enter a valid mobile number.");
      return;
    }

    if (!this.email.includes('@')) {
      alert('Enter a valid email.');
      return;
    }

    if (this.password.length < 6) {
      alert('Password should contain 6+ characters.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Password and confirm password should match.');
      return;
    }

    if (
      this.name &&
      this.email &&
      this.password &&
      this.contact &&
      this.address &&
      this.confirmPassword &&
      this.role
    ) {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        contact: this.contact,
        address: this.address,
        role: this.role
      };

      console.log(user);
      this.service.signupUser(user).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/signin']);
      });
    } else {
      alert('All fields are required.');
    }
  }
}
