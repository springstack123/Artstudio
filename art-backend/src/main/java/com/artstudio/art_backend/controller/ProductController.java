package com.artstudio.art_backend.controller;

import com.artstudio.art_backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET /api/products          → all available products
    // GET /api/products?type=prints  → filtered by type
    @GetMapping
    public ResponseEntity<?> getProducts(@RequestParam(required = false) String type) {
        if (type != null && !type.isBlank()) {
            return ResponseEntity.ok(productService.getByType(type));
        }
        return ResponseEntity.ok(productService.getAll());
    }
}