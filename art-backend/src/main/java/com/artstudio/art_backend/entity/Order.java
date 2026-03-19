package com.artstudio.art_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String pinCode;

    private Double totalAmount;

    // "processing" | "shipped" | "delivered" | "cancelled"
    private String status = "processing";

    private String orderRef;

    @Column(updatable = false)
    private Instant createdAt;

    @PrePersist protected void onCreate() { createdAt = Instant.now(); }
}