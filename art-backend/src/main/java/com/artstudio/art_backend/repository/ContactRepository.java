package com.artstudio.art_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.artstudio.art_backend.entity.ContactMessage;

@Repository
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
}