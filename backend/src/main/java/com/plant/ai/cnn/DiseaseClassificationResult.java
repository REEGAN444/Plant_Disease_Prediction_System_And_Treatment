package com.plant.ai.cnn;

import java.util.Map;

public class DiseaseClassificationResult {
    private String plantName;
    private String diseaseName;
    private double confidence; // e.g. 94.5
    private Map<String, Double> classProbabilities;
    private boolean isPlantDetected;

    public DiseaseClassificationResult() {
    }

    public DiseaseClassificationResult(String plantName, String diseaseName, double confidence, Map<String, Double> classProbabilities, boolean isPlantDetected) {
        this.plantName = plantName;
        this.diseaseName = diseaseName;
        this.confidence = confidence;
        this.classProbabilities = classProbabilities;
        this.isPlantDetected = isPlantDetected;
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

    public Map<String, Double> getClassProbabilities() {
        return classProbabilities;
    }

    public void setClassProbabilities(Map<String, Double> classProbabilities) {
        this.classProbabilities = classProbabilities;
    }

    public boolean isPlantDetected() {
        return isPlantDetected;
    }

    public void setPlantDetected(boolean plantDetected) {
        isPlantDetected = plantDetected;
    }
}
