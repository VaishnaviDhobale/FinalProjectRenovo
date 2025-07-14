import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Product } from '../../../ReusableComponents/Comman/product/product';
import { RouterModule } from '@angular/router';
import { Footer } from '../footer/footer';
import { Service } from '../../../Services/Product/service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Product,RouterModule,Footer,],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit{
  constructor(private service:Service){}
  products:any[]=[]

  ngOnInit(): void {
      try{
        this.service.getAllProducts().subscribe({
          next:(data:any)=>{
            this.products = data;
            console.log(this.products)
          },
          error:(err:any)=>{
            console.log(err);
          }
        })
      }catch(err){
        console.log(err)
      }
  }
}
