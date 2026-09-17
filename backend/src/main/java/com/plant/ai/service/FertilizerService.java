package com.plant.ai.service;

import com.plant.ai.entity.Fertilizer;
import com.plant.ai.exception.ResourceNotFoundException;
import com.plant.ai.repository.FertilizerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FertilizerService {

    private final FertilizerRepository fertilizerRepository;

    public FertilizerService(FertilizerRepository fertilizerRepository) {
        this.fertilizerRepository = fertilizerRepository;
    }

    public List<Fertilizer> getAllFertilizers() {
        return fertilizerRepository.findAll();
    }

    public Fertilizer getFertilizerById(Long id) {
        return fertilizerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fertilizer not found with ID: " + id));
    }

    public List<Fertilizer> getFertilizersByDiseaseId(Long diseaseId) {
        return fertilizerRepository.findByDiseaseId(diseaseId);
    }

    public List<Fertilizer> getFertilizersByType(String productType) {
        return fertilizerRepository.findByProductTypeIgnoreCase(productType);
    }

    public Fertilizer createFertilizer(Fertilizer fertilizer) {
        return fertilizerRepository.save(fertilizer);
    }

    public Fertilizer updateFertilizer(Long id, Fertilizer updated) {
        Fertilizer existing = getFertilizerById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setProductType(updated.getProductType());
        existing.setAvailability(updated.getAvailability());
        existing.setDiseaseId(updated.getDiseaseId());
        return fertilizerRepository.save(existing);
    }

    public void deleteFertilizer(Long id) {
        if (!fertilizerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Fertilizer not found with ID: " + id);
        }
        fertilizerRepository.deleteById(id);
    }
}
