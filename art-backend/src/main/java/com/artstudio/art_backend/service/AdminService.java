package com.artstudio.art_backend.service;

import com.artstudio.art_backend.dto.AdminStatsResponse;
import com.artstudio.art_backend.entity.Order;
import com.artstudio.art_backend.repository.OrderRepository;
import com.artstudio.art_backend.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public AdminService(UserRepository userRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    public AdminStatsResponse getStats() {
        long totalUsers = userRepository.count();
        long totalOrders = orderRepository.count();

        double totalRevenue = orderRepository.findAll()
                .stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();

        List<Order> recentOrders = orderRepository.findAll(
                PageRequest.of(0, 10, Sort.by("createdAt").descending())
        ).getContent();

        return new AdminStatsResponse(totalUsers, totalOrders, totalRevenue, recentOrders);
    }
}
