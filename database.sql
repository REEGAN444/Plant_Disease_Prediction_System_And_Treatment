-- ==========================================================
-- AI Plant Disease Prediction and Recommendation System
-- Database Schema and Sample Data for MySQL 8.x
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `plant_disease_db`;
USE `plant_disease_db`;

-- Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(20) NOT NULL DEFAULT 'USER',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Diseases Table
CREATE TABLE IF NOT EXISTS `diseases` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `plant_name` VARCHAR(100) NOT NULL,
    `disease_name` VARCHAR(150) NOT NULL,
    `disease_cause` TEXT NOT NULL,
    `disease_effect` TEXT NOT NULL,
    `prevention` TEXT NOT NULL
);

-- Fertilizers Table
CREATE TABLE IF NOT EXISTS `fertilizers` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `product_type` VARCHAR(50) NOT NULL, -- 'Natural' or 'Artificial'
    `availability` VARCHAR(50) NOT NULL DEFAULT 'In Stock',
    `disease_id` BIGINT NULL,
    FOREIGN KEY (`disease_id`) REFERENCES `diseases`(`id`) ON DELETE SET NULL
);

-- Medicines Table
CREATE TABLE IF NOT EXISTS `medicines` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `product_type` VARCHAR(50) NOT NULL, -- 'Natural' or 'Artificial'
    `availability` VARCHAR(50) NOT NULL DEFAULT 'In Stock',
    `disease_id` BIGINT NULL,
    FOREIGN KEY (`disease_id`) REFERENCES `diseases`(`id`) ON DELETE SET NULL
);

-- Unified Products Table (Aggregated for easy marketplace shopping)
CREATE TABLE IF NOT EXISTS `products` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `category` VARCHAR(50) NOT NULL, -- 'Fertilizer' or 'Medicine'
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `product_type` VARCHAR(50) NOT NULL, -- 'Natural' or 'Artificial'
    `availability` VARCHAR(50) NOT NULL DEFAULT 'In Stock',
    `plant_name` VARCHAR(100) NULL,
    `disease_id` BIGINT NULL,
    FOREIGN KEY (`disease_id`) REFERENCES `diseases`(`id`) ON DELETE SET NULL
);

-- Predictions Table
CREATE TABLE IF NOT EXISTS `predictions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NULL,
    `plant_name` VARCHAR(100) NOT NULL,
    `disease_name` VARCHAR(150) NOT NULL,
    `confidence` DOUBLE NOT NULL,
    `image_path` VARCHAR(255) NOT NULL,
    `prediction_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);
