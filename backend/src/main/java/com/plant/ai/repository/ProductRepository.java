package com.plant.ai.repository;

import com.plant.ai.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryIgnoreCase(String category);
    List<Product> findByProductTypeIgnoreCase(String productType);
    List<Product> findByDiseaseId(Long diseaseId);
    List<Product> findByPlantNameIgnoreCase(String plantName);
    List<Product> findByCategoryIgnoreCaseAndProductTypeIgnoreCase(String category, String productType);
}
