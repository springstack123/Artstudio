package com.artstudio.art_backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.security.Key;
import com.artstudio.art_backend.entity.Role;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access.expiration:3600000}")
    private long accessExpiration;
    
    @Value("${jwt.refresh.expiration:604800000}") // 7 days
    private long refreshExpiration;

    // Access token (short-lived)
    public String generateAccessToken(Long id, String email, Role role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("id", id)
.claim("role", role != null ? role.name() : "USER")
                .claim("type", "access")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    // Refresh token (long-lived, simple ID claim)
    public String generateRefreshToken(Long id) {
        return Jwts.builder()
                .claim("id", id)
                .claim("type", "refresh")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            System.out.println("JwtUtil - Token validation failed: " + e.getMessage());
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    public boolean isAccessTokenValid(String token, String email) {
        final String tokenEmail = extractEmail(token);
        final boolean isExpired = isTokenExpired(token);
        final String type = getClaims(token).get("type", String.class);
        return "access".equals(type) && email != null && tokenEmail.equals(email) && !isExpired;
    }
    
    public boolean isRefreshTokenValid(String token, Long userId) {
        try {
            Claims claims = getClaims(token);
            String type = claims.get("type", String.class);
            Long tokenId = claims.get("id", Long.class);
            boolean isExpired = isTokenExpired(token);
            return "refresh".equals(type) && tokenId.equals(userId) && !isExpired;
        } catch (Exception e) {
            return false;
        }
    }

    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public Long getIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("id", Long.class);
    }
    
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
