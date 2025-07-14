import { Component, OnInit } from '@angular/core';
import { Products } from '../products/products';
import { AddProduct } from '../../../ReusableComponents/Seller/add-product/add-product';
import { Welcome } from '../../../ReusableComponents/Seller/welcome/welcome';
import { Sidebar } from '../../../ReusableComponents/Seller/sidebar/sidebar';
import { Service } from '../../../Services/Product/service';
import { SingleProduct } from "../single-product/single-product";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, Welcome, AddProduct, Products, SingleProduct],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
products: any[] = [];
  filteredProducts: any[] = [];      
  showAddForm: boolean = false;
  showProducts: boolean = false;

  constructor(
    private service: Service,
  ) {}

  // get data on Component ini 
  isLoading: boolean = true;

ngOnInit(): void {
  setTimeout(() => {
    this.service.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Product load failed:", err);
        this.isLoading = false;
      }
    });
  }, 100);
}


  handleAddProduct() {
    this.showAddForm = true;
    this.showProducts = false;
  }

  handleShowProducts() {
    this.showAddForm = false;
    this.showProducts = true;
  }

  // handle filtered products from sidebar
  onFilterChanged(filtered: any[]) {
    this.filteredProducts = filtered;
    console.log("Dashboard received filtered list:", filtered);
  }
}
