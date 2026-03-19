package com.artstudio.art_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    // "prints" | "originals" | "commissions"
    private String type;

    private String size;

    private Double price;

    // emoji or image URL
    private String image;

    private String badge;

    private boolean available = true;
}