import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../Services/Cart/cart-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  products: any[] = [];
  userId = localStorage.getItem('id') || null;
  totalPrice = 0;
  cartDetails = {};
  proceedToCheckout = false;
  userData:any;

  constructor(private service: CartService) {}

  // ngOnInit
  ngOnInit(): void {
    this.getData();
  }

  // Increment product quantity
  handleIncrement(prod: any): void {
    if (prod.quantity >= Number(prod.product.quantity)) {
      alert('Out Of Stock!');
    } else {
      this.cartDetails = {
        userId: this.userId,
        productId: prod.product.id,
        quantity: 1,
      };
      this.service.addToCart(this.cartDetails).subscribe({
        next: (data) => {
          console.log('Cart updated:', data);
          this.getData();
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
        },
      });
    }
  }

  handleDec(quantity: any): void {}

  // handle delete
  handleDelete(productId: any) {
    let result = confirm('Are you sure? you want to remove item from cart.');
    if (result) {
      this.service.deleteProduct(productId).subscribe({
        next: (value) => {
          alert(value);
          this.getData();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  // handle checkout
  handleCheckout() {
    this.proceedToCheckout = !this.proceedToCheckout;
  }

  // Get cart data
  getData(): void {
    this.totalPrice = 0;

    this.service.getProducts(this.userId).subscribe({
      next: (data: any) => {
        this.products = [...data];
        if (data.length > 0 && data[0].user) {
          this.userData = data[0].user;
        }
        console.log(this.userData);

        // Calculate total price of cart
        this.products.forEach((item, index) => {
          if (item.quantity > 0) {
            this.totalPrice += item.totalPrice;
          }
        });

        console.log(this.products);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
