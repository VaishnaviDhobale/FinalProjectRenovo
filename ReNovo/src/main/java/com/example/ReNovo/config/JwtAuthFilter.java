package com.example.ReNovo.config;

import com.example.ReNovo.models.UserModel;
import com.example.ReNovo.repository.UserRepository;
import com.example.ReNovo.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // List of public endpoints (no token required)
    private final List<String> publicEndpoints = List.of(
        "/user/userLogin",
        "/user/userRegister",
        "/product/getAllProducts"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();

        // ✅ If public endpoint → skip JWT validation
        if (publicEndpoints.contains(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🔐 Check for token
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String userEmail = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            userEmail = jwtUtil.extractEmail(token);
        }

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserModel user = userRepository.findByEmail(userEmail).orElse(null);

            if (user != null && jwtUtil.validateToken(token, user.getEmail())) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(user, null, null);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
