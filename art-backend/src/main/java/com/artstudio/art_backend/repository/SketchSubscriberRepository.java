package com.artstudio.art_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.artstudio.art_backend.entity.SketchSubscriber;

@Repository
public interface SketchSubscriberRepository 
        extends JpaRepository<SketchSubscriber, Long> {

}