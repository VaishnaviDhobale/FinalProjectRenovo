import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http :HttpClient) { }

  // login user 
  loginUser(user: any) {
    return this.http.post(`${this.baseUrl}user/userLogin`, user, { responseType: 'json' });
  }

  // signup
  signupUser(user:any){
    return this.http.post(`${this.baseUrl}user/userRegister`,user, {responseType:'text'});
  }

}
