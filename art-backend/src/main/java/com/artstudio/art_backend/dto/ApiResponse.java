package com.artstudio.art_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;
    private Object data;
    private LocalDateTime timestamp;
    
    public static ApiResponse success(String message, Object data) {
        return new ApiResponse(true, message, data, LocalDateTime.now());
    }
    
    public static ApiResponse error(String message) {
        return new ApiResponse(false, message, null, LocalDateTime.now());
    }
    
    public static ApiResponse success(String message) {
        return new ApiResponse(true, message, null, LocalDateTime.now());
    }
}
