import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  // add to cart 
  addToCart(cartDetails:any) {
    return this.http.post(`${this.baseUrl}cart/addCart`,cartDetails, { responseType: 'text' });
  }

  // get products by userid 
  getProducts(userId:any){
    return this.http.get(`${this.baseUrl}cart/user/${userId}`,{responseType:"json"})
  }

  //delete data from cart
  deleteProduct(productId:any){
    return this.http.delete(`${this.baseUrl}cart/delete/${productId}`,{responseType:'text'});
  }
}
