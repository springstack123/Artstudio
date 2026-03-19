package com.artstudio.art_backend.controller;

import com.artstudio.art_backend.dto.ApiResponse;
import com.artstudio.art_backend.dto.AppDtos;
import com.artstudio.art_backend.dto.AppDtos.UpdateProfileRequest;
import com.artstudio.art_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/users/profile  — returns current user's full profile
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> getProfile(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("User not authenticated"));
        }
        try {
            return ResponseEntity.ok(ApiResponse.success("Profile fetched", userService.getProfile(principal.getName())));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }

    // PUT /api/users/profile  — update bio, photo, handle, address, etc.
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse> updateProfile(@RequestBody UpdateProfileRequest req,
                                           Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("User not authenticated"));
        }
        try {
            return ResponseEntity.ok(ApiResponse.success("Profile updated", userService.updateProfile(principal.getName(), req)));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@RequestBody AppDtos.ChangePasswordRequest req,
                                             Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("User not authenticated"));
        }
        try {
            userService.changePassword(principal.getName(), req.getCurrentPassword(), req.getNewPassword());
            return ResponseEntity.ok(ApiResponse.success("Password updated successfully"));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }

}