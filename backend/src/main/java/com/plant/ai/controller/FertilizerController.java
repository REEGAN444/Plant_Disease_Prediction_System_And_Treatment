package com.plant.ai.controller;

import com.plant.ai.dto.ApiResponse;
import com.plant.ai.entity.Fertilizer;
import com.plant.ai.service.FertilizerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fertilizers")
public class FertilizerController {

    private final FertilizerService fertilizerService;

    public FertilizerController(FertilizerService fertilizerService) {
        this.fertilizerService = fertilizerService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Fertilizer>>> getAllFertilizers(
            @RequestParam(value = "diseaseId", required = false) Long diseaseId,
            @RequestParam(value = "type", required = false) String type) {
        List<Fertilizer> list;
        if (diseaseId != null) {
            list = fertilizerService.getFertilizersByDiseaseId(diseaseId);
        } else if (type != null && !type.isEmpty()) {
            list = fertilizerService.getFertilizersByType(type);
        } else {
            list = fertilizerService.getAllFertilizers();
        }
        return ResponseEntity.ok(ApiResponse.ok("Fertilizers retrieved", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Fertilizer>> getFertilizerById(@PathVariable Long id) {
        Fertilizer fertilizer = fertilizerService.getFertilizerById(id);
        return ResponseEntity.ok(ApiResponse.ok("Fertilizer retrieved", fertilizer));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Fertilizer>> createFertilizer(@RequestBody Fertilizer fertilizer) {
        Fertilizer created = fertilizerService.createFertilizer(fertilizer);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Fertilizer created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Fertilizer>> updateFertilizer(@PathVariable Long id, @RequestBody Fertilizer fertilizer) {
        Fertilizer updated = fertilizerService.updateFertilizer(id, fertilizer);
        return ResponseEntity.ok(ApiResponse.ok("Fertilizer updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFertilizer(@PathVariable Long id) {
        fertilizerService.deleteFertilizer(id);
        return ResponseEntity.ok(ApiResponse.ok("Fertilizer deleted successfully", null));
    }
}
