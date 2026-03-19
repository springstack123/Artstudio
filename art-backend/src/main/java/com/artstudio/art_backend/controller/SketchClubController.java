package com.artstudio.art_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.artstudio.art_backend.entity.SketchSubscriber;
import com.artstudio.art_backend.repository.SketchSubscriberRepository;

@RestController
@RequestMapping("/api/sketchclub")
@CrossOrigin(origins = "http://localhost:5173")
public class SketchClubController {

    @Autowired
    private SketchSubscriberRepository repo;

    @PostMapping
    public ResponseEntity<?> join(@RequestBody SketchSubscriber sub) {

        repo.save(sub);

        return ResponseEntity.ok("Joined successfully");
    }
}