package com.artstudio.art_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "commission_requests")
public class CommissionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String location;

    private String size;

    private String deadline;

    @Column(length = 2000)
    private String notes;

	public CommissionRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CommissionRequest(String name, String email, String location, String size, String deadline, String notes) {
		super();
		this.name = name;
		this.email = email;
		this.location = location;
		this.size = size;
		this.deadline = deadline;
		this.notes = notes;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

    
}