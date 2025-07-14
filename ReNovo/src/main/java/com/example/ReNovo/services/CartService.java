package com.example.ReNovo.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ReNovo.dtos.CartDTO;
import com.example.ReNovo.models.CartModel;
import com.example.ReNovo.models.ProductModel;
import com.example.ReNovo.models.UserModel;
import com.example.ReNovo.repository.CartRepository;
import com.example.ReNovo.repository.ProductsRepository;
import com.example.ReNovo.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductsRepository productRepo;

    // Add to Cart
    public void addToCart(CartDTO dto) {
        System.out.println(dto);
        UserModel user = userRepo.findById(dto.getUserId()).orElseThrow();
        ProductModel product = productRepo.findById(dto.getProductId()).orElseThrow();

        // Debug logs
        System.out.println("UserId: " + dto.getUserId());
        System.out.println("ProductId: " + dto.getProductId());
        System.out.println("Quantity: " + dto.getQuantity());
        System.out.println("SellPrice: " + product.getSellPrice());

        // Check if the product is already in the user's cart
        CartModel existingCart = cartRepo.findByUserIdAndProductId(dto.getUserId(), dto.getProductId());

        if (existingCart != null) {
            int newQuantity = existingCart.getQuantity() + dto.getQuantity();
            BigDecimal sellPrice = new BigDecimal(product.getSellPrice());
            BigDecimal total = sellPrice.multiply(BigDecimal.valueOf(newQuantity));

            existingCart.setQuantity(newQuantity);
            existingCart.setTotalPrice(total);
            cartRepo.save(existingCart);
        } else {
            CartModel cart = new CartModel();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(dto.getQuantity());

            BigDecimal sellPrice = new BigDecimal(product.getSellPrice());
            BigDecimal quantity = BigDecimal.valueOf(dto.getQuantity());
            BigDecimal total = sellPrice.multiply(quantity);
            cart.setTotalPrice(total);

            cartRepo.save(cart);
        }
    }

    // Get cart items by user ID
    public List<CartModel> getCartByUser(Long userId) {
        return cartRepo.findByUserId(userId);
    }

    // Remove an item from the cart by cart item ID
    public void removeItem(Long id) {
        cartRepo.deleteById(id);
    }
}
