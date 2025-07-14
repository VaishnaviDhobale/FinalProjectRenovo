import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar as sellerNavbar } from './ReusableComponents/Seller/navbar/navbar';
import { Service } from './Services/Product/service';
import { HttpClientModule } from '@angular/common/http';
import { Navbar as userNavbar } from './ReusableComponents/User/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,userNavbar,sellerNavbar,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected title = 'ReNovo-View';
  role: string | null = null;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.role = localStorage.getItem('role');
    }
  }
}
