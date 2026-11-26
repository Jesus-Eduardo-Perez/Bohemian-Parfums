
const Brand = require("../models/brandModel");

function generateSlug(name) {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Obtener todas las marcas
exports.getBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();

        res.status(200).json({
            success: true,
            data: brands
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error al obtener las marcas"
        });
    }
};

// Crear una marca
exports.createBrand = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "El nombre de la marca es obligatorio"
            });
        }

        const cleanName = name.trim();
        const slug = generateSlug(cleanName);

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Nombre de marca no válido"
            });
        }

        const brandId = await Brand.create({
            name: cleanName,
            slug
        });

        res.status(201).json({
            success: true,
            message: "Marca creada correctamente",
            data: { id: brandId }
        });

    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "La marca ya existe"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error al crear la marca"
        });
    }
};
