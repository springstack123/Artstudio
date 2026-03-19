package com.artstudio.art_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.artstudio.art_backend.dto.ApiResponse;
import com.artstudio.art_backend.dto.LoginRequest;
import com.artstudio.art_backend.dto.RegisterRequest;
import com.artstudio.art_backend.service.AuthService;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest req) {
        try {
            Map<String, Object> result = authService.register(req);
            return ResponseEntity.ok(ApiResponse.success("Registered successfully", result));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest req) {
        try {
            Map<String, Object> result = authService.login(req);
            return ResponseEntity.ok(ApiResponse.success("Login successful", result));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(ApiResponse.error(ex.getMessage()));
        }
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse> refreshToken(@RequestBody Map<String, String> req) {
        String refreshToken = req.get("refreshToken");
        // AuthService.refreshToken(refreshToken) - implemented later
        return ResponseEntity.ok(ApiResponse.success("Token refreshed"));
    }
}
