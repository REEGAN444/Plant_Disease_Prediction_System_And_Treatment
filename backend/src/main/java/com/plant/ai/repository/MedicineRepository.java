package com.plant.ai.repository;

import com.plant.ai.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByDiseaseId(Long diseaseId);
    List<Medicine> findByProductTypeIgnoreCase(String productType);
}
