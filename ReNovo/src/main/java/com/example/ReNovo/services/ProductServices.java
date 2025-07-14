package com.example.ReNovo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ReNovo.models.ProductModel;
import com.example.ReNovo.repository.ProductsRepository;


@Service
public class ProductServices {
    @Autowired
    ProductsRepository repo;

    // add product
    public Object addProducts(ProductModel ProductData) {
        try {
            repo.save(ProductData);
            return "Product added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    // get all products 
     public List<ProductModel>getAllProducts() {
           return repo.findAll();
    }

    // get product by id 
    public Object getProductById(Long id){
        try {
            if (repo.existsById(id)) {
                return repo.findById(id);
            } else {
                return "Product with ID " + id + " does not found.";
            }
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    // update product data
    public Object updateProductDetails(Long id, ProductModel updatedData) {
        try {
            ProductModel ProductData = repo.findById(id).orElseThrow();

            // update values one by one
            ProductData.setProductTitle(updatedData.getProductTitle());
            ProductData.setCategory(updatedData.getCategory());
            ProductData.setProductCondition(updatedData.getProductCondition());
            ProductData.setPrice(updatedData.getPrice());
            ProductData.setSellPrice(updatedData.getSellPrice());
            ProductData.setNegotiable(updatedData.getNegotiable());
            ProductData.setQuantity(updatedData.getQuantity());
            ProductData.setDescription(updatedData.getDescription());
            ProductData.setReason(updatedData.getReason());
            ProductData.setPhoto(updatedData.getPhoto());

            repo.save(ProductData);
            return "Product with id " + id + " updated.";

        } catch (Exception e) {
            return e.getMessage();
        }
    }

    // delete product  
    public Object deleteProduct(Long id) {
        try {
            if (repo.existsById(id)) {
                repo.deleteById(id);
                return "Product with ID " + id + " deleted.";
            } else {
                return "Product with ID " + id + " does not found.";
            }
        } catch (Exception e) {
            return e.getMessage();
        }
    }

}
