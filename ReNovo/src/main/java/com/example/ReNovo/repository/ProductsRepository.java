package com.example.ReNovo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ReNovo.models.ProductModel;

public interface ProductsRepository extends JpaRepository<ProductModel, Long> {

}
