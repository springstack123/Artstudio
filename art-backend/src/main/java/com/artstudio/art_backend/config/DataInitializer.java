package com.artstudio.art_backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.artstudio.art_backend.entity.Product;
import com.artstudio.art_backend.entity.Role;
import com.artstudio.art_backend.entity.User;
import com.artstudio.art_backend.repository.ProductRepository;
import com.artstudio.art_backend.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Initialize products if empty
            if (productRepository.count() == 0) {
                
                // Prints
                productRepository.save(new Product(null, "Old Town Street", "prints", "A4", 1200.0, "https://example.com/old-town.jpg", "🖼️", true));
                productRepository.save(new Product(null, "Bridge Study", "prints", "A3", 1800.0, "https://example.com/bridge.jpg", "🌉", true));
                productRepository.save(new Product(null, "Rooftop View", "prints", "A4", 1200.0, "https://example.com/rooftop.jpg", "🏛️", true));
                productRepository.save(new Product(null, "Quiet Alley", "prints", "A4", 1200.0, "https://example.com/alley.jpg", "🏘️", true));
                productRepository.save(new Product(null, "Coastal Walk", "prints", "A3", 1800.0, "https://example.com/coastal.jpg", "🌊", true));
                productRepository.save(new Product(null, "Morning Coffee", "prints", "A4", 1500.0, "https://example.com/coffee.jpg", "☕", true));
                
                // Originals
                productRepository.save(new Product(null, "City Cathedral", "originals", "A3", 8500.0, "https://example.com/cathedral.jpg", "⛪", true));
                productRepository.save(new Product(null, "Harbor Sunset", "originals", "A2", 12000.0, "https://example.com/harbor.jpg", "🌅", true));
                productRepository.save(new Product(null, "Mountain Village", "originals", "A3", 9500.0, "https://example.com/mountain.jpg", "🏔️", true));
                
                // Commissions (custom)
                productRepository.save(new Product(null, "Custom Commission", "commissions", "Custom", 0.0, "https://example.com/commission.jpg", "🎨", true));
                
                System.out.println(">>> Sample products initialized: " + productRepository.count() + " products");
            }

            // Initialize test user if not exists
            if (userRepository.findByEmail("test@example.com").isEmpty()) {
                User testUser = new User();
                testUser.setName("Test User");
                testUser.setEmail("test@example.com");
                testUser.setPassword(passwordEncoder.encode("password123"));
                testUser.setRole(Role.USER);
                userRepository.save(testUser);
                System.out.println(">>> Test user created: test@example.com / password123");
            }

            // Always ensure admin user exists
            if (userRepository.findByEmail("admin@example.com").isEmpty()) {
                User adminUser = User.builder()
                    .name("Admin")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
                userRepository.save(adminUser);
                System.out.println(">>> Admin user created: admin@example.com / admin123");
            }
         // Fix existing users with null role
            userRepository.findAll().forEach(u -> {
                if (u.getRole() == null) {
                    u.setRole(Role.USER);
                    userRepository.save(u);
                }
            });
            System.out.println(">>> Fixed null roles for existing users");
        };
    }
}

