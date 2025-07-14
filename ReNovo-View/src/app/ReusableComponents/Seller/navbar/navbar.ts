import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-seller',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  name = localStorage.getItem("name");
  navName!: string;
  role = localStorage.getItem("role");
  token = localStorage.getItem("token");
  clickedOnProfile = false;

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.navName = this.name?.charAt(0).toUpperCase() || '';
    this.cdRef.detectChanges();  // ✅ Fix the NG0100 error
  }

  clickedProfile() {
    this.clickedOnProfile = !this.clickedOnProfile;
  }

  handleLogout() {
    localStorage.clear();
    this.clickedOnProfile = false;
    this.router.navigate(['/signin']);
  }
}
