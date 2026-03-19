package com.artstudio.art_backend.dto;

import com.artstudio.art_backend.entity.Order;

import java.util.List;

public record AdminStatsResponse(
    long totalUsers,
    long totalOrders,
    double totalRevenue,
    List<Order> recentOrders
) {}
