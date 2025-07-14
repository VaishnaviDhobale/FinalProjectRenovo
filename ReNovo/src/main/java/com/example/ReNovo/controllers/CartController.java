package com.example.ReNovo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ReNovo.dtos.CartDTO;
import com.example.ReNovo.models.CartModel;
import com.example.ReNovo.services.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    // add to cart
    @PostMapping("/addCart")
    public String addToCart(@RequestBody CartDTO dto) {
        try {
            cartService.addToCart(dto);
            System.out.println(dto);
            return "Added to cart!";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    // get cart by user
    @GetMapping("/user/{userId}")
    public List<CartModel> getCartItems(@PathVariable Long userId) {
        return cartService.getCartByUser(userId);
    }

    // delete cart product
    @DeleteMapping("/delete/{id}")
    public String removeCartItem(@PathVariable Long id) {
        cartService.removeItem(id);
        return "Removed from cart!";
    }

}
