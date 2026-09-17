package com.plant.ai.dto;

import com.plant.ai.entity.Fertilizer;
import com.plant.ai.entity.Medicine;
import com.plant.ai.entity.Product;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class PredictionResponseDto {
    private Long id;
    private Long userId;
    private String plantName;
    private String diseaseName;
    private double confidence;
    private String imagePath;
    private boolean isHealthy;
    private String diseaseCause;
    private String diseaseEffect;
    private String prevention;
    private List<Fertilizer> recommendedFertilizers;
    private List<Medicine> recommendedMedicines;
    private List<Product> recommendedProducts;
    private Map<String, Double> classProbabilities;
    private LocalDateTime predictionDate;

    public PredictionResponseDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPlantName() {
        return plantName;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public double getConfidence() {
        return confidence;
    }

    public void setConfidence(double confidence) {
        this.confidence = confidence;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public boolean isHealthy() {
        return isHealthy;
    }

    public void setHealthy(boolean healthy) {
        isHealthy = healthy;
    }

    public String getDiseaseCause() {
        return diseaseCause;
    }

    public void setDiseaseCause(String diseaseCause) {
        this.diseaseCause = diseaseCause;
    }

    public String getDiseaseEffect() {
        return diseaseEffect;
    }

    public void setDiseaseEffect(String diseaseEffect) {
        this.diseaseEffect = diseaseEffect;
    }

    public String getPrevention() {
        return prevention;
    }

    public void setPrevention(String prevention) {
        this.prevention = prevention;
    }

    public List<Fertilizer> getRecommendedFertilizers() {
        return recommendedFertilizers;
    }

    public void setRecommendedFertilizers(List<Fertilizer> recommendedFertilizers) {
        this.recommendedFertilizers = recommendedFertilizers;
    }

    public List<Medicine> getRecommendedMedicines() {
        return recommendedMedicines;
    }

    public void setRecommendedMedicines(List<Medicine> recommendedMedicines) {
        this.recommendedMedicines = recommendedMedicines;
    }

    public List<Product> getRecommendedProducts() {
        return recommendedProducts;
    }

    public void setRecommendedProducts(List<Product> recommendedProducts) {
        this.recommendedProducts = recommendedProducts;
    }

    public Map<String, Double> getClassProbabilities() {
        return classProbabilities;
    }

    public void setClassProbabilities(Map<String, Double> classProbabilities) {
        this.classProbabilities = classProbabilities;
    }

    public LocalDateTime getPredictionDate() {
        return predictionDate;
    }

    public void setPredictionDate(LocalDateTime predictionDate) {
        this.predictionDate = predictionDate;
    }
}
