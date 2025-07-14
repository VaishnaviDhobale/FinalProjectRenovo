import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit {
  @Output() addProductClicked = new EventEmitter<void>();
  @Output() showProductsClicked = new EventEmitter<void>();

  @Input() showProduct!: boolean;
  @Input() showAddForm!: boolean;
  @Input() products: any[] = [];

  @Output() filteredProductsChanged = new EventEmitter<any[]>(); 

  categories: string[] = [];
  selectedCategory = '';
  filteredProducts: any[] = [];

  ngOnInit() {
    this.getUniqueCategories();
    this.filteredProducts = [...this.products];
  }

  showAddProduct() {
    this.addProductClicked.emit();
  }

  showProducts() {
    this.showProductsClicked.emit();
  }

  getUniqueCategories() {
    const uniqueCategories = new Set<string>();
    this.products.forEach((product) => {
      if (product.category) {
        uniqueCategories.add(product.category);
      }
    });
    this.categories = Array.from(uniqueCategories);
    console.log(`Unique Categories: ${this.categories}`);
  }

  handleFilter() {

    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(
        (product) => product.category === this.selectedCategory
      );
    } else {
      this.filteredProducts = [...this.products];
    }

    this.filteredProductsChanged.emit(this.filteredProducts); 
  }
}
