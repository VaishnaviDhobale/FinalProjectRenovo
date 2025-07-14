import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../ReusableComponents/Comman/product/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [Product, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'], 
})
export class Products {
  @Input() products: any[] = [];
  @Input() isLoading:any;
  searchTerm: string = '';
  

  //Getter for live search
  get filteredProducts() {
    const term = this.searchTerm.toLowerCase().trim();
    console.log(term)
    return this.products.filter(product =>
      product.productTitle.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
       product.id?.toString().includes(term)  
    );
  }
}
 