package com.artstudio.art_backend.controller;

import com.artstudio.art_backend.dto.ApiResponse;
import com.artstudio.art_backend.dto.AppDtos.*;
import com.artstudio.art_backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // POST /api/orders  — place order, optionally save address
    @PostMapping
    public ResponseEntity<ApiResponse> createOrder(@RequestBody CreateOrderRequest req) {
        try {
            return ResponseEntity.ok(ApiResponse.success("Order created", orderService.createOrder(req)));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }

    // GET /api/orders/my  — orders for logged-in user
    @GetMapping("/my")
    public ResponseEntity<ApiResponse> myOrders(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("User not authenticated"));
        }
        try {
            return ResponseEntity.ok(ApiResponse.success("Orders fetched", orderService.getOrdersByEmail(principal.getName())));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        }
    }
}