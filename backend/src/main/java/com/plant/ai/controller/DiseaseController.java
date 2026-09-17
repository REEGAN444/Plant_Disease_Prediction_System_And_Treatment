package com.plant.ai.controller;

import com.plant.ai.dto.ApiResponse;
import com.plant.ai.entity.Disease;
import com.plant.ai.service.DiseaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diseases")
public class DiseaseController {

    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Disease>>> getAllDiseases(
            @RequestParam(value = "plant", required = false) String plant) {
        List<Disease> list = (plant != null && !plant.isEmpty())
                ? diseaseService.getDiseasesByPlant(plant)
                : diseaseService.getAllDiseases();
        return ResponseEntity.ok(ApiResponse.ok("Diseases retrieved", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Disease>> getDiseaseById(@PathVariable Long id) {
        Disease disease = diseaseService.getDiseaseById(id);
        return ResponseEntity.ok(ApiResponse.ok("Disease retrieved", disease));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Disease>> createDisease(@RequestBody Disease disease) {
        Disease created = diseaseService.createDisease(disease);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Disease created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Disease>> updateDisease(@PathVariable Long id, @RequestBody Disease disease) {
        Disease updated = diseaseService.updateDisease(id, disease);
        return ResponseEntity.ok(ApiResponse.ok("Disease updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDisease(@PathVariable Long id) {
        diseaseService.deleteDisease(id);
        return ResponseEntity.ok(ApiResponse.ok("Disease deleted successfully", null));
    }
}
