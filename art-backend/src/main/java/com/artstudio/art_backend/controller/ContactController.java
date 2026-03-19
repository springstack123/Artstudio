package com.artstudio.art_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.artstudio.art_backend.entity.ContactMessage;
import com.artstudio.art_backend.repository.ContactRepository;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    private ContactRepository repo;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody ContactMessage msg) {

        repo.save(msg);

        return ResponseEntity.ok("Message received");
    }
}