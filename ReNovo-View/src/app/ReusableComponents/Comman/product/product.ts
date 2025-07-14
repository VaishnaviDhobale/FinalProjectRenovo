import { Component, Input, OnInit } from '@angular/core';
import { ProductStateService } from '../../../Services/product-state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit{
    @Input() product: any;
    role :any;
    constructor(private productStateService : ProductStateService) {}

    ngOnInit(): void {
        this.role = localStorage.getItem("role")
    }

    handleClick() {
      this.productStateService.setShowSingleProduct(true, this.product.id);   
    }
}
