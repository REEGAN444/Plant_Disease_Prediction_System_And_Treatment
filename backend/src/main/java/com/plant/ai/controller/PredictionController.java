package com.plant.ai.controller;

import com.plant.ai.dto.ApiResponse;
import com.plant.ai.dto.PredictionResponseDto;
import com.plant.ai.entity.Prediction;
import com.plant.ai.service.PredictionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("/predict")
    public ResponseEntity<ApiResponse<PredictionResponseDto>> predict(
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "userId", required = false) Long userId) throws IOException {

        PredictionResponseDto response = predictionService.predict(image, userId);
        return ResponseEntity.ok(ApiResponse.ok("Prediction analysis complete", response));
    }

    @GetMapping("/predictions/history/{userId}")
    public ResponseEntity<ApiResponse<List<Prediction>>> getUserHistory(@PathVariable Long userId) {
        List<Prediction> history = predictionService.getUserHistory(userId);
        return ResponseEntity.ok(ApiResponse.ok("Prediction history retrieved", history));
    }

    @GetMapping("/predictions/history")
    public ResponseEntity<ApiResponse<List<Prediction>>> getAllHistory() {
        List<Prediction> history = predictionService.getAllHistory();
        return ResponseEntity.ok(ApiResponse.ok("All prediction history retrieved", history));
    }

    @GetMapping("/predictions/{id}")
    public ResponseEntity<ApiResponse<Prediction>> getPredictionById(@PathVariable Long id) {
        Prediction prediction = predictionService.getPredictionById(id);
        return ResponseEntity.ok(ApiResponse.ok("Prediction details retrieved", prediction));
    }
}
