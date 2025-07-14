import { Routes } from '@angular/router';
import { Dashboard } from './PagesComponents/User/dashboard/dashboard';
import { Signup } from './PagesComponents/User/signup/signup';
import { Products } from './PagesComponents/User/products/products';
import { Signin as SellerSignin } from './PagesComponents/Comman/signin/signin';
import { Dashboard as SellerDashboard } from './PagesComponents/Seller/dashboard/dashboard';
import { Products as SellerProducts } from './PagesComponents/Seller/products/products';
import { Signup as SellerSignup } from './PagesComponents/Seller/signup/signup';
import { SingleProduct } from './PagesComponents/Seller/single-product/single-product';
import { EditProduct } from './PagesComponents/Seller/edit-product/edit-product';
import { Home } from './PagesComponents/User/home/home';
import { SingleProductPage } from './PagesComponents/User/single-product-page/single-product-page';
import { Cart } from './PagesComponents/User/cart/cart';

export const routes: Routes = [
    {path:"", component:Home},
    {path:"products", component:Products},
    {path:"dash", component:Dashboard},
    {path:"signup", component:Signup},
    {path:"user-single-page/:id", component:SingleProductPage},
    {path:"cart",component:Cart},

    // comman routes 
    {path:"signin", component:SellerSignin},

    // seller routes 
    {path:"seller-dashboard", component: SellerDashboard},
    {path:"seller-products", component: SellerProducts},
    {path:"seller-signup", component:SellerSignup},
    {path:"seller-single-page/:id", component:SingleProduct},
    {path:"edit-product/:id", component:EditProduct},
];
