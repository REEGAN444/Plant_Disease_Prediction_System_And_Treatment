package com.plant.ai.controller;

import com.plant.ai.dto.ApiResponse;
import com.plant.ai.entity.Medicine;
import com.plant.ai.service.MedicineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Medicine>>> getAllMedicines(
            @RequestParam(value = "diseaseId", required = false) Long diseaseId,
            @RequestParam(value = "type", required = false) String type) {
        List<Medicine> list;
        if (diseaseId != null) {
            list = medicineService.getMedicinesByDiseaseId(diseaseId);
        } else if (type != null && !type.isEmpty()) {
            list = medicineService.getMedicinesByType(type);
        } else {
            list = medicineService.getAllMedicines();
        }
        return ResponseEntity.ok(ApiResponse.ok("Medicines retrieved", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Medicine>> getMedicineById(@PathVariable Long id) {
        Medicine medicine = medicineService.getMedicineById(id);
        return ResponseEntity.ok(ApiResponse.ok("Medicine retrieved", medicine));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Medicine>> createMedicine(@RequestBody Medicine medicine) {
        Medicine created = medicineService.createMedicine(medicine);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Medicine created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Medicine>> updateMedicine(@PathVariable Long id, @RequestBody Medicine medicine) {
        Medicine updated = medicineService.updateMedicine(id, medicine);
        return ResponseEntity.ok(ApiResponse.ok("Medicine updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
        return ResponseEntity.ok(ApiResponse.ok("Medicine deleted successfully", null));
    }
}
