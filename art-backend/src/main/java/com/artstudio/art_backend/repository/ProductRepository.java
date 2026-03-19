package com.artstudio.art_backend.repository;

import com.artstudio.art_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByAvailableTrue();
    List<Product> findByTypeAndAvailableTrue(String type);
}                               