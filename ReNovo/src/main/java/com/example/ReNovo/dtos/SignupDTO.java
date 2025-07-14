package com.example.ReNovo.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupDTO {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Contact number is required")
    @Size(min = 10, max = 10, message = "Contact number 10 digits")
    private String contact;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Role is required")
    private String role;
}
