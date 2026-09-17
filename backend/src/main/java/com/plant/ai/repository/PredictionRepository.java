package com.plant.ai.repository;

import com.plant.ai.entity.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, Long> {
    List<Prediction> findByUserIdOrderByPredictionDateDesc(Long userId);
    List<Prediction> findAllByOrderByPredictionDateDesc();
}
