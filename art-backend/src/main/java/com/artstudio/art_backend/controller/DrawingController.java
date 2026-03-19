package com.artstudio.art_backend.controller;

import org.springframework.web.bind.annotation.*;

import com.artstudio.art_backend.entity.Drawing;
import com.artstudio.art_backend.repository.DrawingRepository;

import java.util.List;

@RestController
@RequestMapping("/api/drawings")
@CrossOrigin
public class DrawingController {

    private final DrawingRepository repo;

    public DrawingController(DrawingRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/weekly")
    public List<Drawing> getWeeklyDrawings() {
        return repo.findTop6ByOrderByCreatedAtDesc();
    }
    @PostMapping
    public Drawing addDrawing(@RequestBody Drawing drawing) {
        return repo.save(drawing);
    }
}