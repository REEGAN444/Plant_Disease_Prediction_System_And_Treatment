package com.plant.ai.service;

import com.plant.ai.entity.Disease;
import com.plant.ai.exception.ResourceNotFoundException;
import com.plant.ai.repository.DiseaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiseaseService {

    private final DiseaseRepository diseaseRepository;

    public DiseaseService(DiseaseRepository diseaseRepository) {
        this.diseaseRepository = diseaseRepository;
    }

    public List<Disease> getAllDiseases() {
        return diseaseRepository.findAll();
    }

    public Disease getDiseaseById(Long id) {
        return diseaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Disease not found with ID: " + id));
    }

    public Disease getDiseaseByName(String diseaseName) {
        return diseaseRepository.findByDiseaseNameIgnoreCase(diseaseName)
                .orElseThrow(() -> new ResourceNotFoundException("Disease not found with name: " + diseaseName));
    }

    public List<Disease> getDiseasesByPlant(String plantName) {
        return diseaseRepository.findByPlantNameIgnoreCase(plantName);
    }

    public Disease createDisease(Disease disease) {
        return diseaseRepository.save(disease);
    }

    public Disease updateDisease(Long id, Disease updated) {
        Disease existing = getDiseaseById(id);
        existing.setPlantName(updated.getPlantName());
        existing.setDiseaseName(updated.getDiseaseName());
        existing.setDiseaseCause(updated.getDiseaseCause());
        existing.setDiseaseEffect(updated.getDiseaseEffect());
        existing.setPrevention(updated.getPrevention());
        return diseaseRepository.save(existing);
    }

    public void deleteDisease(Long id) {
        if (!diseaseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Disease not found with ID: " + id);
        }
        diseaseRepository.deleteById(id);
    }
}
