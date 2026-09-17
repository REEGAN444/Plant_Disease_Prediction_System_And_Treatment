package com.plant.ai.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "diseases")
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plant_name", nullable = false, length = 100)
    private String plantName;

    @Column(name = "disease_name", nullable = false, length = 150)
    private String diseaseName;

    @Column(name = "disease_cause", columnDefinition = "TEXT", nullable = false)
    private String diseaseCause;

    @Column(name = "disease_effect", columnDefinition = "TEXT", nullable = false)
    private String diseaseEffect;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String prevention;

    public Disease() {
    }

    public Disease(Long id, String plantName, String diseaseName, String diseaseCause, String diseaseEffect, String prevention) {
        this.id = id;
        this.plantName = plantName;
        this.diseaseName = diseaseName;
        this.diseaseCause = diseaseCause;
        this.diseaseEffect = diseaseEffect;
        this.prevention = prevention;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
