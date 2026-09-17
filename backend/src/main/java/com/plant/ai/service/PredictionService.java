package com.plant.ai.service;

import com.plant.ai.cnn.CnnModel;
import com.plant.ai.cnn.DiseaseClassificationResult;
import com.plant.ai.cnn.ImagePreprocessor;
import com.plant.ai.dto.PredictionResponseDto;
import com.plant.ai.entity.*;
import com.plant.ai.exception.ResourceNotFoundException;
import com.plant.ai.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PredictionService {

    private final ImagePreprocessor imagePreprocessor;
    private final CnnModel cnnModel;
    private final DiseaseRepository diseaseRepository;
    private final FertilizerRepository fertilizerRepository;
    private final MedicineRepository medicineRepository;
    private final ProductRepository productRepository;
    private final PredictionRepository predictionRepository;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    public PredictionService(ImagePreprocessor imagePreprocessor,
                             CnnModel cnnModel,
                             DiseaseRepository diseaseRepository,
                             FertilizerRepository fertilizerRepository,
                             MedicineRepository medicineRepository,
                             ProductRepository productRepository,
                             PredictionRepository predictionRepository) {
        this.imagePreprocessor = imagePreprocessor;
        this.cnnModel = cnnModel;
        this.diseaseRepository = diseaseRepository;
        this.fertilizerRepository = fertilizerRepository;
        this.medicineRepository = medicineRepository;
        this.productRepository = productRepository;
        this.predictionRepository = predictionRepository;
    }

    public PredictionResponseDto predict(MultipartFile file, Long userId) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please provide a valid plant leaf image file.");
        }

        String contentType = file.getContentType();
        if (contentType != null && !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files (JPG, PNG, WEBP) are supported.");
        }

        // Ensure upload directory exists
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate safe unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = ".jpg";
        if (originalFilename != null && originalFilename.lastIndexOf(".") > 0) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String storedFilename = "leaf_" + System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0, 8) + extension;
        Path targetLocation = uploadPath.resolve(storedFilename);

        // Read image bytes
        byte[] imageBytes = file.getBytes();
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Preprocess image and build 3D tensor
        ImagePreprocessor.PreprocessedData preprocessed = imagePreprocessor.preprocess(imageBytes);

        // Run pure Java CNN inference
        DiseaseClassificationResult cnnResult = cnnModel.predict(preprocessed);

        // Query database for disease details
        String plantName = cnnResult.getPlantName();
        String diseaseName = cnnResult.getDiseaseName();
        double confidence = cnnResult.getConfidence();

        Disease disease = diseaseRepository.findByDiseaseNameIgnoreCase(diseaseName)
                .orElseGet(() -> {
                    // Fallback to plant name search or create safe placeholder
                    List<Disease> list = diseaseRepository.findByPlantNameIgnoreCase(plantName);
                    if (!list.isEmpty()) {
                        return list.get(0);
                    }
                    Disease d = new Disease();
                    d.setPlantName(plantName);
                    d.setDiseaseName(diseaseName);
                    d.setDiseaseCause("Pathogen infection or physiological plant stress.");
                    d.setDiseaseEffect("Noticeable leaf discoloration, lesion spotting, or reduced photosynthetic activity.");
                    d.setPrevention("Ensure balanced fertilization, appropriate crop spacing, and prophylactic bio-fungicide sprays.");
                    return diseaseRepository.save(d);
                });

        // Query recommendations
        Long diseaseId = disease.getId();
        List<Fertilizer> fertilizers = fertilizerRepository.findByDiseaseId(diseaseId);
        List<Medicine> medicines = medicineRepository.findByDiseaseId(diseaseId);
        List<Product> products = productRepository.findByDiseaseId(diseaseId);

        // If specific disease associations are empty, populate with plant-level products
        if (products.isEmpty()) {
            products = productRepository.findByPlantNameIgnoreCase(plantName);
        }
        if (products.isEmpty()) {
            products = productRepository.findAll();
            if (products.size() > 4) {
                products = products.subList(0, 4);
            }
        }

        // Persist prediction history
        String imageWebPath = "/uploads/" + storedFilename;
        Prediction prediction = new Prediction();
        prediction.setUserId(userId);
        prediction.setPlantName(plantName);
        prediction.setDiseaseName(diseaseName);
        prediction.setConfidence(confidence);
        prediction.setImagePath(imageWebPath);
        prediction.setPredictionDate(LocalDateTime.now());
        Prediction savedPrediction = predictionRepository.save(prediction);

        // Build response DTO
        PredictionResponseDto response = new PredictionResponseDto();
        response.setId(savedPrediction.getId());
        response.setUserId(userId);
        response.setPlantName(plantName);
        response.setDiseaseName(diseaseName);
        response.setConfidence(confidence);
        response.setImagePath(imageWebPath);
        response.setHealthy(diseaseName.toLowerCase().contains("healthy"));
        response.setDiseaseCause(disease.getDiseaseCause());
        response.setDiseaseEffect(disease.getDiseaseEffect());
        response.setPrevention(disease.getPrevention());
        response.setRecommendedFertilizers(fertilizers);
        response.setRecommendedMedicines(medicines);
        response.setRecommendedProducts(products);
        response.setClassProbabilities(cnnResult.getClassProbabilities());
        response.setPredictionDate(savedPrediction.getPredictionDate());

        return response;
    }

    public List<Prediction> getUserHistory(Long userId) {
        if (userId == null) {
            return predictionRepository.findAllByOrderByPredictionDateDesc();
        }
        return predictionRepository.findByUserIdOrderByPredictionDateDesc(userId);
    }

    public List<Prediction> getAllHistory() {
        return predictionRepository.findAllByOrderByPredictionDateDesc();
    }

    public Prediction getPredictionById(Long id) {
        return predictionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prediction record not found with ID: " + id));
    }
}
