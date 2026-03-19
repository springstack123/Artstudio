package com.artstudio.art_backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.artstudio.art_backend.dto.AppDtos.ProfileResponse;
import com.artstudio.art_backend.dto.AppDtos.UpdateProfileRequest;
import com.artstudio.art_backend.entity.User;
import com.artstudio.art_backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository  = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)   // ← was UserRepository (class), now userRepository (instance)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        if (newPassword == null || newPassword.length() < 8) {
            throw new RuntimeException("New password must be at least 8 characters");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public ProfileResponse getProfile(String email) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toResponse(u);
    }

    public ProfileResponse updateProfile(String email, UpdateProfileRequest req) {
        User u = userRepository.findByEmail(email)  // ← fixed: userRepository not UserRepository
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (req.getName()         != null) u.setName(req.getName());
        if (req.getHandle()       != null) u.setHandle(req.getHandle());
        if (req.getBio()          != null) u.setBio(req.getBio());
        if (req.getProfilePhoto() != null) u.setProfilePhoto(req.getProfilePhoto());
        if (req.getLocation()     != null) u.setLocation(req.getLocation());
        if (req.getWebsite()      != null) u.setWebsite(req.getWebsite());
        if (req.getAddressLine()  != null) u.setAddressLine(req.getAddressLine());
        if (req.getCity()         != null) u.setCity(req.getCity());
        if (req.getPinCode()      != null) u.setPinCode(req.getPinCode());
        if (req.getPhone()        != null) u.setPhone(req.getPhone());

        userRepository.save(u);
        return toResponse(u);
    }

    private ProfileResponse toResponse(User u) {
        return new ProfileResponse(
            u.getId(), u.getName(), u.getEmail(),
            u.getHandle(), u.getBio(), u.getProfilePhoto(),
            u.getLocation(), u.getWebsite(),
            u.getAddressLine(), u.getCity(), u.getPinCode(), u.getPhone()
        );
    }
}