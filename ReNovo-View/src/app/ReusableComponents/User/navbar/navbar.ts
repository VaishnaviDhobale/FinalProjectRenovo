import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/Cart/cart-service';

@Component({
  selector: 'app-navbar-user',
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
  cartLength: number = 0;

  constructor(private router: Router, private service: CartService) {}

  ngOnInit(): void {
    this.navName = this.name?.charAt(0).toUpperCase() || '';
    this.getCartData();
  }
  generateEvent(){
    
  }

  clickedProfile(): void {
    this.clickedOnProfile = !this.clickedOnProfile;
  }

  handleLogout(): void {
    localStorage.clear();
    this.clickedOnProfile = false;
    this.router.navigate(['/signin']);
  }

  getCartData(): void {
    const userId = localStorage.getItem("id");
    if (userId) {
      this.service.getProducts(userId).subscribe({
        next: (value) => {
          this.cartLength = (value as any[]).length;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
