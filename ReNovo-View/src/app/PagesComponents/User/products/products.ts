import { Component, OnInit } from '@angular/core';
import { Service } from '../../../Services/Product/service';
import { UserSidebar } from '../../../ReusableComponents/User/user-sidebar/user-sidebar';
import { Product } from '../../../ReusableComponents/Comman/product/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [UserSidebar,Product],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  products: any[] = [];
  // isLoading: boolean = true;

  constructor(private service: Service) {}

  ngOnInit(): void {
    console.log('Products component initialized');
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('Calling getAllProducts()');
    this.service.getAllProducts().subscribe({
      next: (data: any) => {
        console.log('API Success:', data[0].id);
        this.products = data;
        // this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        // this.isLoading = false;
      },
    });
  }
}
