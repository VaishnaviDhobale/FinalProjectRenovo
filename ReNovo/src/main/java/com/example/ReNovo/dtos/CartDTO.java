package com.example.ReNovo.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartDTO {

    @NotBlank(message = "UserId is required")
    private Long userId;

    @NotBlank(message = "ProductId is required")
    private Long productId;

    @NotBlank(message = "@uantity is required")
    private int quantity;
}

