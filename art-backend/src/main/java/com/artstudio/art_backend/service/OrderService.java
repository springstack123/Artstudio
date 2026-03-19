package com.artstudio.art_backend.service;

import com.artstudio.art_backend.dto.AppDtos.*;
import com.artstudio.art_backend.entity.Order;
import com.artstudio.art_backend.repository.OrderRepository;
import com.artstudio.art_backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository  userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository  = userRepository;
    }

    public OrderResponse createOrder(CreateOrderRequest req) {
        String ref = "SBA-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Order order = Order.builder()
                .customerName(req.getCustomerName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .address(req.getAddress())
                .city(req.getCity())
                .pinCode(req.getPinCode())
                .totalAmount(req.getTotalAmount())
                .status("processing")
                .orderRef(ref)
                .build();

        orderRepository.save(order);

        // Save address back to user profile if requested
        if (req.isSaveAddress() && req.getEmail() != null) {
            userRepository.findByEmail(req.getEmail()).ifPresent(u -> {  // ← fixed: userRepository not UserRepository
                u.setAddressLine(req.getAddress());
                u.setCity(req.getCity());
                u.setPinCode(req.getPinCode());
                u.setPhone(req.getPhone());
                userRepository.save(u);
            });
        }

        return new OrderResponse(order.getId(), ref, order.getStatus(),
                order.getTotalAmount(), order.getCustomerName(), order.getEmail());
    }

    public List<OrderResponse> getOrdersByEmail(String email) {
        return orderRepository.findByEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(o -> new OrderResponse(o.getId(), o.getOrderRef(), o.getStatus(),
                        o.getTotalAmount(), o.getCustomerName(), o.getEmail()))
                .collect(Collectors.toList());
    }
}