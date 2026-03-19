package com.artstudio.art_backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.artstudio.art_backend.dto.LoginRequest;
import com.artstudio.art_backend.dto.RegisterRequest;
import com.artstudio.art_backend.entity.User;
import com.artstudio.art_backend.repository.UserRepository;
import java.util.HashMap;
import java.util.Map;
import com.artstudio.art_backend.util.JwtUtil;
import com.artstudio.art_backend.service.UserService;
import com.artstudio.art_backend.entity.Role;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    public Map<String, Object> register(RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);

        user.setRefreshToken(jwtUtil.generateRefreshToken(user.getId()));
        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("accessToken", jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getRole()));
        response.put("refreshToken", user.getRefreshToken());
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole() != null ? user.getRole().name().toLowerCase() : "user");
        response.put("handle", user.getHandle());
        response.put("bio", user.getBio());
        response.put("profilePhoto", user.getProfilePhoto());
        response.put("location", user.getLocation());
        response.put("website", user.getWebsite());
        response.put("addressLine", user.getAddressLine());
        response.put("city", user.getCity());
        response.put("pinCode", user.getPinCode());
response.put("phone", user.getPhone());
        response.put("role", user.getRole() != null ? user.getRole().name() : "USER");
        return response;
    }

    public Map<String, Object> login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate/refresh tokens
        user.setRefreshToken(jwtUtil.generateRefreshToken(user.getId()));
        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("accessToken", jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getRole()));
        response.put("refreshToken", user.getRefreshToken());
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().name().toLowerCase()); // ← ADDED
        response.put("handle", user.getHandle());
        response.put("bio", user.getBio());
        response.put("profilePhoto", user.getProfilePhoto());
        response.put("location", user.getLocation());
        response.put("website", user.getWebsite());
        response.put("addressLine", user.getAddressLine());
        response.put("city", user.getCity());
        response.put("pinCode", user.getPinCode());
        response.put("phone", user.getPhone());
        return response;
    }
}