
const pool = require("../config/db");

const Brand = {

    // Obtener todas las marcas
    async findAll() {
        const [rows] = await pool.execute(
            `SELECT id, name, slug, created_at
             FROM brands
             ORDER BY name ASC`
        );

        return rows;
    },

    // Buscar una marca por su ID
    async findById(id) {
        const [rows] = await pool.execute(
            `SELECT id, name, slug
             FROM brands
             WHERE id = ?`,
            [id]
        );

        return rows[0] || null;
    },

    // Registrar una marca
    async create({ name, slug }) {
        const [result] = await pool.execute(
            `INSERT INTO brands (name, slug)
             VALUES (?, ?)`,
            [name, slug]
        );

        return result.insertId;
    }

};

module.exports = Brand;
