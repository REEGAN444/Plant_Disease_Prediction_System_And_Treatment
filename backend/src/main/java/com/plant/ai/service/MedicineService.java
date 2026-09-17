package com.plant.ai.service;

import com.plant.ai.entity.Medicine;
import com.plant.ai.exception.ResourceNotFoundException;
import com.plant.ai.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine not found with ID: " + id));
    }

    public List<Medicine> getMedicinesByDiseaseId(Long diseaseId) {
        return medicineRepository.findByDiseaseId(diseaseId);
    }

    public List<Medicine> getMedicinesByType(String productType) {
        return medicineRepository.findByProductTypeIgnoreCase(productType);
    }

    public Medicine createMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Long id, Medicine updated) {
        Medicine existing = getMedicineById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setProductType(updated.getProductType());
        existing.setAvailability(updated.getAvailability());
        existing.setDiseaseId(updated.getDiseaseId());
        return medicineRepository.save(existing);
    }

    public void deleteMedicine(Long id) {
        if (!medicineRepository.existsById(id)) {
            throw new ResourceNotFoundException("Medicine not found with ID: " + id);
        }
        medicineRepository.deleteById(id);
    }
}
