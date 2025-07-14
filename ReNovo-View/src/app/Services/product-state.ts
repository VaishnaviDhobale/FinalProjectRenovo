import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  private showProduct = new BehaviorSubject<any>({
    showProduct: false,
    productId: null
  });

  selectedProductCase$ = this.showProduct.asObservable();

  getSelectedProductValue() {
    return this.showProduct.getValue();
  }

  setShowSingleProduct(showSingleProduct: boolean, productId: number | null = null) {
    this.showProduct.next({
      showProduct: showSingleProduct,
      productId: productId
    });
  }
}
