package com.plant.ai.repository;

import com.plant.ai.entity.Fertilizer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FertilizerRepository extends JpaRepository<Fertilizer, Long> {
    List<Fertilizer> findByDiseaseId(Long diseaseId);
    List<Fertilizer> findByProductTypeIgnoreCase(String productType);
}
