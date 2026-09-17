package com.plant.ai.service;

import com.plant.ai.entity.Product;
import com.plant.ai.exception.ResourceNotFoundException;
import com.plant.ai.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts(String category, String productType, Long diseaseId) {
        if (category != null && !category.isEmpty() && productType != null && !productType.isEmpty()) {
            return productRepository.findByCategoryIgnoreCaseAndProductTypeIgnoreCase(category, productType);
        } else if (category != null && !category.isEmpty()) {
            return productRepository.findByCategoryIgnoreCase(category);
        } else if (productType != null && !productType.isEmpty()) {
            return productRepository.findByProductTypeIgnoreCase(productType);
        } else if (diseaseId != null) {
            return productRepository.findByDiseaseId(diseaseId);
        }
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        Product existing = getProductById(id);
        existing.setName(updated.getName());
        existing.setCategory(updated.getCategory());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setProductType(updated.getProductType());
        existing.setAvailability(updated.getAvailability());
        existing.setPlantName(updated.getPlantName());
        existing.setDiseaseId(updated.getDiseaseId());
        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with ID: " + id);
        }
        productRepository.deleteById(id);
    }
}
