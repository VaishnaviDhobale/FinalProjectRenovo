import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Service } from '../../../Services/Product/service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct implements OnInit {
  constructor(
    private service: Service,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  product = {
    productTitle: '',
    category: '',
    productCondition: '',
    price: null,
    sellPrice: null,
    negotiable: false,
    quantity: null,
    description: '',
    reason: '',
    imageUrl: '',
    photo: '',
  };
  id: any;

  // getting data
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = parseInt(idParam, 10);
      this.service.getSingleProduct(this.id).subscribe({
        next: (data: any) => {
          this.product = data;
          console.log('Fetched product for editing:', this.product);
        },
        error: (err: any) => {
          console.error('Error fetching product for edit:', err);
        },
      });
    }
  }
  handleEdit() {
    this.service.updateProduct(this.id, this.product).subscribe({
      next: (data: any) => {
        console.log('Product updated successfully:', data);
        this.router.navigate(['/seller-single-page', this.id]);
      },
      error: (err: any) => {
        console.error('Error updating product:', err);
      },
    });
  }
}
