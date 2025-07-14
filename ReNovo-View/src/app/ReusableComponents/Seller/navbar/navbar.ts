import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar-seller',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  
  name = localStorage.getItem("name");
  navName!:any;
  role = localStorage.getItem("role");
  token = localStorage.getItem("token");
  clickedOnProfile!:boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
      this.navName= this.name?.charAt(0).toUpperCase();
  }

  clickedProfile(){
    this.clickedOnProfile = !this.clickedOnProfile;
  }
  handleLogout(){
    localStorage.clear();
    this.clickedOnProfile = false;
    this.router.navigate(['/signin']);
  }
}
