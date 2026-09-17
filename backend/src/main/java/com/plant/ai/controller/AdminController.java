package com.plant.ai.controller;

import com.plant.ai.dto.AdminStatsDto;
import com.plant.ai.dto.ApiResponse;
import com.plant.ai.entity.User;
import com.plant.ai.repository.*;
import com.plant.ai.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final PredictionRepository predictionRepository;
    private final DiseaseRepository diseaseRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final FertilizerRepository fertilizerRepository;
    private final MedicineRepository medicineRepository;
    private final UserService userService;

    public AdminController(PredictionRepository predictionRepository,
                           DiseaseRepository diseaseRepository,
                           UserRepository userRepository,
                           ProductRepository productRepository,
                           FertilizerRepository fertilizerRepository,
                           MedicineRepository medicineRepository,
                           UserService userService) {
        this.predictionRepository = predictionRepository;
        this.diseaseRepository = diseaseRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.fertilizerRepository = fertilizerRepository;
        this.medicineRepository = medicineRepository;
        this.userService = userService;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminStatsDto>> getAdminStats() {
        AdminStatsDto stats = new AdminStatsDto(
                predictionRepository.count(),
                diseaseRepository.count(),
                userRepository.count(),
                productRepository.count(),
                fertilizerRepository.count(),
                medicineRepository.count()
        );
        return ResponseEntity.ok(ApiResponse.ok("Admin stats retrieved", stats));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.ok("Users retrieved", users));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.ok("User deleted successfully", null));
    }
}
