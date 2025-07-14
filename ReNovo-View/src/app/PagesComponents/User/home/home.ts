import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Product } from '../../../ReusableComponents/Comman/product/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Product,RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  
}
