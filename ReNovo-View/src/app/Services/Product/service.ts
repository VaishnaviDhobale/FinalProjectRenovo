import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class Service {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http : HttpClient) {}

  // get all products 
  getAllProducts() {
    return this.http.get(`${this.baseUrl}product/getAllProducts`, { responseType: 'json' });
  }

  //get single product by id  
  getSingleProduct(id: number) {
    return this.http.get(`${this.baseUrl}product/getProductById/${id}`, { responseType: 'json' });
  }

  // delete product by id
  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}product/deleteProduct/${id}`, { responseType: 'text' });
  }

  //update product by id
  updateProduct(id: number, product: any) {
    return this.http.put(`${this.baseUrl}product/updateProduct/${id}`, product, { responseType: 'text' });
  }

  // add product
  addProduct(product: any) {
    return this.http.post(`${this.baseUrl}product/addProduct`, product, { responseType: 'text' });
  }

}
