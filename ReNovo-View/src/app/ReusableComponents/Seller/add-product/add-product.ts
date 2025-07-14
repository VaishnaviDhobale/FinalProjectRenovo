import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Service } from '../../../Services/Product/service';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'], // ✅ Fixed spelling
})
export class AddProduct {
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
    photo: '', 
  };

  imageUrl: string = '';
  isUploading: boolean = false;

  constructor(private http: HttpClient, private service: Service
  ) {
    console.log('Service injected:', this.service); // ✅ Debug log
  }

  // Upload image to Cloudinary
  uploadImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.isUploading = true;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset'); // Use your actual preset

    this.http
      .post('https://api.cloudinary.com/v1_1/doegmrrey/image/upload', formData)
      .subscribe({
        next: (res: any) => {
          this.product.photo = res.secure_url;
          this.imageUrl = res.secure_url;
          this.isUploading = false;
          console.log('Uploaded image URL:', this.product.photo);
        },
        error: (err) => {
          console.error('Image upload failed:', err);
          this.isUploading = false;
          alert('Image upload failed');
        },
      });
  }

  // Handle product submission
  handleSubmit() {
    // const p = this.product;
    // console.log('Submitting product:', p); 

    // if (
    //   !p.productTitle.trim() ||
    //   !p.category.trim() ||
    //   !p.productCondition.trim() ||
    //   p.price === null || p.price <= 0 ||
    //   p.sellPrice === null || p.sellPrice <= 0 ||
    //   p.quantity === null || p.quantity <= 0 ||
    //   !p.description.trim() ||
    //   !p.reason.trim() ||
    //   !p.photo.trim()
    // ) {
    //   alert('Please fill all the fields correctly');
    //   return;
    // }

    this.service.addProduct(this.product).subscribe({
      next: (res: any) => {
        console.log('Product added successfully:', res);
        alert('Product added successfully');
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Error adding product');
      }
    });
  }
}
