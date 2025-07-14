package com.example.ReNovo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ReNovo.models.CartModel;

public interface CartRepository extends JpaRepository<CartModel,Long> {
        List<CartModel> findByUserId(Long userId);
         CartModel findByUserIdAndProductId(Long userId, Long productId);
}
