package com.artstudio.art_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.artstudio.art_backend.entity.CommissionRequest;
import com.artstudio.art_backend.repository.CommissionRepository;

@RestController
@RequestMapping("/api/commissions")
@CrossOrigin(origins = "http://localhost:5173")
public class CommissionController {

    @Autowired
    private CommissionRepository repo;

    @PostMapping
    public CommissionRequest create(@RequestBody CommissionRequest request) {
        return repo.save(request);
    }
}