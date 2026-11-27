
const pool = require("../config/db");

const Product = {

    // Obtener productos publicados para el catálogo
    async findPublished() {
        const [rows] = await pool.execute(
            `SELECT
                p.*,
                b.name AS brand_name,

                (
                    SELECT pi.image_url
                    FROM product_images pi
                    WHERE pi.product_id = p.id
                    ORDER BY
                        pi.is_primary DESC,
                        pi.position ASC,
                        pi.id ASC
                    LIMIT 1
                ) AS main_image

             FROM products p

             INNER JOIN brands b
                ON p.brand_id = b.id

             WHERE p.status = 'published'

             ORDER BY p.created_at DESC`
        );

        return rows;
    },

    // Obtener todos los productos, incluidos borradores
    async findAll() {
        const [rows] = await pool.execute(
            `SELECT
                p.*,
                b.name AS brand_name,

                (
                    SELECT pi.image_url
                    FROM product_images pi
                    WHERE pi.product_id = p.id
                    ORDER BY
                        pi.is_primary DESC,
                        pi.position ASC,
                        pi.id ASC
                    LIMIT 1
                ) AS main_image

             FROM products p

             INNER JOIN brands b
                ON p.brand_id = b.id

             ORDER BY p.created_at DESC`
        );

        return rows;
    },

    // Buscar un producto por su slug
    async findBySlug(slug) {
        const [rows] = await pool.execute(
            `SELECT
                p.*,
                b.name AS brand_name

             FROM products p

             INNER JOIN brands b
                ON p.brand_id = b.id

             WHERE p.slug = ?
             AND p.status = 'published'`,
            [slug]
        );

        if (rows.length === 0) {
            return null;
        }

        const product = rows[0];

        // Obtener todas las imágenes del producto
        const [images] = await pool.execute(
            `SELECT id, image_url, is_primary, position
             FROM product_images
             WHERE product_id = ?
             ORDER BY
                is_primary DESC,
                position ASC,
                id ASC`,
            [product.id]
        );

        product.images = images;

        return product;
    },

    // Registrar un producto
    async create(product) {
        const {
            brand_id,
            name,
            slug,
            price,
            description,
            concentration,
            gender,
            fragrance_family,
            top_notes,
            heart_notes,
            base_notes,
            stock,
            status
        } = product;

        const [result] = await pool.execute(
            `INSERT INTO products (
                brand_id,
                name,
                slug,
                price,
                description,
                concentration,
                gender,
                fragrance_family,
                top_notes,
                heart_notes,
                base_notes,
                stock,
                status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                brand_id,
                name,
                slug,
                price,
                description,
                concentration,
                gender,
                fragrance_family,
                top_notes,
                heart_notes,
                base_notes,
                stock,
                status
            ]
        );

        return result.insertId;
    },

    // Actualizar un producto
    async update(id, product) {
        const {
            brand_id,
            name,
            slug,
            price,
            description,
            concentration,
            gender,
            fragrance_family,
            top_notes,
            heart_notes,
            base_notes,
            stock,
            status
        } = product;

        const [result] = await pool.execute(
            `UPDATE products SET
                brand_id = ?,
                name = ?,
                slug = ?,
                price = ?,
                description = ?,
                concentration = ?,
                gender = ?,
                fragrance_family = ?,
                top_notes = ?,
                heart_notes = ?,
                base_notes = ?,
                stock = ?,
                status = ?
             WHERE id = ?`,
            [
                brand_id,
                name,
                slug,
                price,
                description,
                concentration,
                gender,
                fragrance_family,
                top_notes,
                heart_notes,
                base_notes,
                stock,
                status,
                id
            ]
        );

        return result.affectedRows;
    },

    // Eliminar un producto
    async delete(id) {
        const [result] = await pool.execute(
            `DELETE FROM products
             WHERE id = ?`,
            [id]
        );

        return result.affectedRows;
    },
// Buscar un producto por su ID
async findById(id) {
    const [rows] = await pool.execute(
        `SELECT id, name, slug
         FROM products
         WHERE id = ?`,
        [id]
    );

    return rows[0] || null;
},

// Agregar varias imágenes a un producto
async addImages(productId, images) {

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Consultar cuántas imágenes tiene actualmente
        const [existingImages] = await connection.execute(
            `SELECT COUNT(*) AS total
             FROM product_images
             WHERE product_id = ?`,
            [productId]
        );

        const currentTotal = Number(existingImages[0].total);

        const insertedImages = [];

        for (let i = 0; i < images.length; i++) {

            const image = images[i];

            const isPrimary = currentTotal === 0 && i === 0;

            const position = currentTotal + i;

            const [result] = await connection.execute(
                `INSERT INTO product_images
                 (product_id, image_url, is_primary, position)
                 VALUES (?, ?, ?, ?)`,
                [
                    productId,
                    image.image_url,
                    isPrimary,
                    position
                ]
            );

            insertedImages.push({
                id: result.insertId,
                image_url: image.image_url,
                is_primary: isPrimary,
                position
            });
        }

        await connection.commit();

        return insertedImages;

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {
        connection.release();
    }
},

};

module.exports = Product;
