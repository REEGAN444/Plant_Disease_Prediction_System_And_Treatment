package com.plant.ai.dto;

public class AdminStatsDto {
    private long totalPredictions;
    private long totalDiseases;
    private long totalUsers;
    private long totalProducts;
    private long totalFertilizers;
    private long totalMedicines;

    public AdminStatsDto() {
    }

    public AdminStatsDto(long totalPredictions, long totalDiseases, long totalUsers, long totalProducts, long totalFertilizers, long totalMedicines) {
        this.totalPredictions = totalPredictions;
        this.totalDiseases = totalDiseases;
        this.totalUsers = totalUsers;
        this.totalProducts = totalProducts;
        this.totalFertilizers = totalFertilizers;
        this.totalMedicines = totalMedicines;
    }

    public long getTotalPredictions() {
        return totalPredictions;
    }

    public void setTotalPredictions(long totalPredictions) {
        this.totalPredictions = totalPredictions;
    }

    public long getTotalDiseases() {
        return totalDiseases;
    }

    public void setTotalDiseases(long totalDiseases) {
        this.totalDiseases = totalDiseases;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getTotalFertilizers() {
        return totalFertilizers;
    }

    public void setTotalFertilizers(long totalFertilizers) {
        this.totalFertilizers = totalFertilizers;
    }

    public long getTotalMedicines() {
        return totalMedicines;
    }

    public void setTotalMedicines(long totalMedicines) {
        this.totalMedicines = totalMedicines;
    }
}
