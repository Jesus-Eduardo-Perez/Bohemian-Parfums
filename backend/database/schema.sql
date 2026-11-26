
-- ==========================================
-- BOHEMIAN PARFUMS
-- Creación de base de datos y tablas
-- ==========================================

CREATE DATABASE IF NOT EXISTS bohemian_parfums
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE bohemian_parfums;

-- ==========================================
-- 1. USUARIOS
-- ==========================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin') NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================
-- 2. MARCAS
-- ==========================================

CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================
-- 3. PRODUCTOS
-- ==========================================

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand_id INT NOT NULL,

    name VARCHAR(180) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,

    price DECIMAL(10,2) NOT NULL,
    description TEXT,

    concentration VARCHAR(80),
    gender ENUM('Masculino', 'Femenino', 'Unisex'),
    fragrance_family VARCHAR(120),

    top_notes TEXT,
    heart_notes TEXT,
    base_notes TEXT,

    stock INT UNSIGNED DEFAULT 0,

    status ENUM('draft', 'published', 'archived')
        NOT NULL DEFAULT 'draft',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_brands
        FOREIGN KEY (brand_id)
        REFERENCES brands(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_products_brand (brand_id),
    INDEX idx_products_status (status)
) ENGINE=InnoDB;

-- ==========================================
-- 4. IMÁGENES DE PRODUCTOS
-- ==========================================

CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,

    image_url VARCHAR(1000) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    position INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_images_products
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_images_product (product_id)
) ENGINE=InnoDB;
