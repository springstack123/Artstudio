package com.artstudio.art_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.artstudio.art_backend.entity.Drawing;

import java.util.List;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {

    List<Drawing> findTop6ByOrderByCreatedAtDesc();

}