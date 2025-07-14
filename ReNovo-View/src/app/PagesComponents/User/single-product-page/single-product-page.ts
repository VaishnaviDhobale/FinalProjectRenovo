import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../Services/Cart/cart-service';
import { Service } from '../../../Services/Product/service';

@Component({
  selector: 'app-single-product-page',
  standalone: true, // ✅ important for standalone component
  imports: [], // ✅ add CommonModule or any other needed imports later
  templateUrl: './single-product-page.html',
  styleUrls: ['./single-product-page.css'], // ✅ corrected typo: styleUrls (not styleUrl)
})
export class SingleProductPage implements OnInit {
  product: any = {};
  quentity: number = 1;
  cartDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private service: Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const productId = parseInt(idParam, 10);
      const userId = localStorage.getItem('id') ?? '';

      this.cartDetails = {
        userId: userId ? +userId : null,
        productId,
        quantity: this.quentity,
      };

      this.service.getSingleProduct(productId).subscribe({
        next: (data: any) => {
          this.product = data;
          console.log('Fetched product:', this.product);
        },
        error: (err: any) => {
          console.error('Error fetching product:', err);
        },
      });
    } else {
      console.warn('No product ID found in route');
    }
  }

  // ✅ Add to Cart
  handleAddToCart(): void {
    try {
      alert("working")
      console.log('cart details', this.cartDetails);

      this.cartService.addToCart(this.cartDetails).subscribe({
        next: (data) => {
          alert(data);
        },
        error: (err) => {
          console.error(err);
          alert('Server Error, Please try later');
        },
      });
    } catch (err) {
      alert('Something went wrong, please try again later');
    }
  }
}
