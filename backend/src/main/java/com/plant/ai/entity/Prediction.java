package com.plant.ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "predictions")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "plant_name", nullable = false, length = 100)
    private String plantName;

    @Column(name = "disease_name", nullable = false, length = 150)
    private String diseaseName;

    @Column(nullable = false)
    private Double confidence;

    @Column(name = "image_path", nullable = false, length = 255)
    private String imagePath;

    @Column(name = "prediction_date")
    private LocalDateTime predictionDate = LocalDateTime.now();

    public Prediction() {
    }

    public Prediction(Long id, Long userId, String plantName, String diseaseName, Double confidence, String imagePath) {
        this.id = id;
        this.userId = userId;
        this.plantName = plantName;
        this.diseaseName = diseaseName;
        this.confidence = confidence;
        this.imagePath = imagePath;
        this.predictionDate = LocalDateTime.now();
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

    public Double getConfidence() {
        return confidence;
    }

    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public LocalDateTime getPredictionDate() {
        return predictionDate;
    }

    public void setPredictionDate(LocalDateTime predictionDate) {
        this.predictionDate = predictionDate;
    }
}
