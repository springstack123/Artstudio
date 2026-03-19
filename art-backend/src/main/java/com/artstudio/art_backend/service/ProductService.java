package com.artstudio.art_backend.service;

import com.artstudio.art_backend.entity.Product;
import com.artstudio.art_backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAll() {
        return productRepository.findByAvailableTrue();
    }

    public List<Product> getByType(String type) {
        return productRepository.findByTypeAndAvailableTrue(type);
    }
}