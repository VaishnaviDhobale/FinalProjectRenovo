package com.example.ReNovo.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.ReNovo.dtos.LoginDTO;
import com.example.ReNovo.dtos.SignupDTO;
import com.example.ReNovo.models.UserModel;
import com.example.ReNovo.repository.UserRepository;
import com.example.ReNovo.utils.JwtUtil;

@Service
public class UserServices {
    @Autowired
    UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // user registration with DTO
    public String userRegistration(SignupDTO dto) {
        try {

            UserModel user = new UserModel();

            Optional<UserModel> existingUserByEmail = repo.findByEmail(dto.getEmail());
            if (existingUserByEmail.isPresent()) {
                return "You already have an account. Please log in.";
            }

            user.setName(dto.getName());
            user.setEmail(dto.getEmail());
            user.setContact(dto.getContact());
            user.setAddress(dto.getAddress());
            user.setRole(dto.getRole());
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
            UserModel savedUser = repo.save(user);

            if (savedUser != null) {
                return "Registered Successfully";
            } else {
                return "Server error! Please try again later.";
            }

        } catch (Exception e) {
            System.err.println("Exception during registration: " + e.getMessage());
            return e.getMessage();
        }
    }

    // user login with DTO
    public Map<String, String> userLogin(LoginDTO dto) {
    Map<String, String> response = new HashMap<>();

    Optional<UserModel> userOpt = repo.findByEmail(dto.getEmail());
    if (userOpt.isEmpty()) {
        response.put("msg", "User not found, please register.");
        return response;
    }

    UserModel user = userOpt.get();

    if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
        String token = jwtUtil.generateToken(user.getEmail());
        response.put("msg", "Login Successful!");
        response.put("token", token);
        response.put("name", user.getName());
        response.put("role", user.getRole());
        response.put("id", String.valueOf(user.getId()));
    } else {
        response.put("msg", "Incorrect password, please try again.");
    }

    return response;
}

    // get all user
    public List<UserModel> getAllUsers() {
        return repo.findAll();
    }

    // get user by id
    public Object getUserById(Long id) {
        try {
            if (repo.existsById(id)) {
                return repo.findById(id);
            } else {
                return "User with ID " + id + " does not found.";
            }
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    // Update user data
    public Object updateUserDetails(Long id, UserModel updatedData) {
        try {
            UserModel userData = repo.findById(id).orElseThrow();

            // update values one by one
            userData.setName(updatedData.getName());
            userData.setEmail(updatedData.getEmail());
            userData.setPassword(updatedData.getPassword());

            repo.save(userData);
            return "User with id " + id + " updated.";

        } catch (Exception e) {
            return e.getMessage();
        }
    }

    // delete user details
    public Object deleteUserAc(Long id) {
        try {
            if (repo.existsById(id)) {
                repo.deleteById(id);
                return "User account with ID " + id + " deleted.";
            } else {
                return "User account with ID " + id + " does not found.";
            }
        } catch (Exception e) {
            return e.getMessage();
        }
    }

}
