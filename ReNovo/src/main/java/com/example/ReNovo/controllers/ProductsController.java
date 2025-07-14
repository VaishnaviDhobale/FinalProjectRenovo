package com.example.ReNovo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ReNovo.models.ProductModel;
import com.example.ReNovo.services.ProductServices;

@RestController
@RequestMapping("/product")
public class ProductsController {
    @Autowired
    ProductServices service;

    // get all products 
    @GetMapping("/getAllProducts")
    public List<ProductModel> getAllProducts(){
        return service.getAllProducts();
    }

    // get product by id 
    @GetMapping("/getProductById/{id}")
    public Object getProductById(@PathVariable Long id){
        return service.getProductById(id);
    }

    // add product
    @PostMapping("/addProduct")
    public Object addProduct(@RequestBody ProductModel product){
        return service.addProducts(product);
    }

    // update Product 
    @PutMapping("/updateProduct/{id}")
    public Object updateProductDetails(@PathVariable Long id, @RequestBody ProductModel updatedData){
        return service.updateProductDetails(id, updatedData);
    }

    // delete product
    @DeleteMapping("/deleteProduct/{id}")
    public Object deleteProduct(@PathVariable Long id){
        return service.deleteProduct(id);
    }


}
