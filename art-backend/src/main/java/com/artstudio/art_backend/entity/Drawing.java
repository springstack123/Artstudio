package com.artstudio.art_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Drawing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String imageUrl;

    private String description;

    private LocalDateTime createdAt = LocalDateTime.now();

	public Drawing() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Drawing(String title, String imageUrl, String description, LocalDateTime createdAt) {
		super();
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

    // getters setters
    
}