package com.artstudio.art_backend.dto;

import lombok.Data;

public class AppDtos {

    // ── Profile update ────────────────────────────────
    @Data
    public static class UpdateProfileRequest {
        private String name;
        private String handle;
        private String bio;
        private String profilePhoto;   // base64 string from frontend
        private String location;
        private String website;
        // saved address
        private String addressLine;
        private String city;
        private String pinCode;
        private String phone;
    }

    @Data
    @lombok.AllArgsConstructor
    public static class ProfileResponse {
        private Long id;
        private String name;
        private String email;
        private String handle;
        private String bio;
        private String profilePhoto;
        private String location;
        private String website;
        private String addressLine;
        private String city;
        private String pinCode;
        private String phone;
    }

    // ── Order ─────────────────────────────────────────
    @Data
    public static class CreateOrderRequest {
        private String customerName;
        private String email;
        private String phone;
        private String address;
        private String city;
        private String pinCode;
        private Double totalAmount;
        private boolean saveAddress;   // if true → persist to user profile
    }

    @Data @lombok.AllArgsConstructor
    public static class OrderResponse {
        private Long id;
        private String orderRef;
        private String status;
        private Double totalAmount;
        private String customerName;
        private String email;
    }
    @Data
    public static class ChangePasswordRequest {
        private String currentPassword;
        private String newPassword;
    }
}