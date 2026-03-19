package com.artstudio.art_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false, unique = true)
    private String email;

@Column(nullable = false)
    private String password;

    private String refreshToken;

    // ── Profile fields ──────────────────────────────
    private String handle;

    @Column(length = 500)
    private String bio;

    // Base64 or relative URL stored here
    @Column(columnDefinition = "TEXT")
    private String profilePhoto;

    private String location;
    private String website;

    // ── Default saved address ────────────────────────
    private String addressLine;
    private String city;
    private String pinCode;
    private String phone;

    private boolean enabled = true;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(updatable = false)
    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist  protected void onCreate() { createdAt = updatedAt = Instant.now(); }
    @PreUpdate   protected void onUpdate() { updatedAt = Instant.now(); }
}