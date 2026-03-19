package com.artstudio.art_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.artstudio.art_backend.entity.CommissionRequest;

public interface CommissionRepository extends JpaRepository<CommissionRequest, Long> {
}