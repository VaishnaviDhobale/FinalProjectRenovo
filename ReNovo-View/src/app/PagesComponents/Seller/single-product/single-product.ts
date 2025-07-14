import { Component, OnInit } from '@angular/core';
import { Service } from '../../../Services/Product/service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './single-product.html',
  styleUrls: ['./single-product.css'],
})
export class SingleProduct implements OnInit {
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);

      this.service.getSingleProduct(id).subscribe({
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

  // handle delete product
  handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (confirmed) {
      this.service.deleteProduct(id).subscribe({
        next: () => {
          console.log('Product deleted successfully.');
          this.router.navigate(['/seller-dashboard']);
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        },
      });
    } else {
      console.log('Deletion canceled.');
    }
  }
}
