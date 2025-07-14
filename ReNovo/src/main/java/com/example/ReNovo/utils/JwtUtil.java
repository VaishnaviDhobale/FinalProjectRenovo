package com.example.ReNovo.utils;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // Use a fixed secret key (must be at least 256 bits for HS256)
    private final String SECRET = "my-super-secret-key-my-super-secret-key"; // 32+ chars
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Generate token
    public String generateToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuer("ReNovoApp")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5)) // 5 hours
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract email from token
    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }

    // Validate token with email
    public boolean validateToken(String token, String email) {
        try {
            String tokenEmail = extractEmail(token);
            return (tokenEmail.equals(email) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }
}
