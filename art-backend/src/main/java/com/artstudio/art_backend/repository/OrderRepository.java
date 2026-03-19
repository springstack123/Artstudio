package com.artstudio.art_backend.repository;

import com.artstudio.art_backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByEmailOrderByCreatedAtDesc(String email);
}