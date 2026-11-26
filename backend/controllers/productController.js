
const Product = require("../models/productModel");

// Generar un slug a partir del nombre del producto
function generateSlug(name) {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Obtener todos los productos publicados
exports.getPublishedProducts = async (req, res) => {
    try {
        const products = await Product.findPublished();

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error al obtener los productos"
        });
    }
};

// Obtener un producto por su slug
exports.getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await Product.findBySlug(slug);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error al obtener el producto"
        });
    }
};

// Obtener todos los productos, incluidos borradores
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error al obtener los productos"
        });
    }
};

// Crear un producto
exports.createProduct = async (req, res) => {
    try {
        const {
            brand_id,
            name,
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
        } = req.body;

        if (!brand_id || !name || price === undefined || price === null || price === "") {
            return res.status(400).json({
                success: false,
                message: "La marca, el nombre y el precio son obligatorios"
            });
        }

        const numericBrandId = Number(brand_id);
        const numericPrice = Number(price);
        const numericStock = stock === undefined ? 0 : Number(stock);

        if (!Number.isInteger(numericBrandId) || numericBrandId <= 0) {
            return res.status(400).json({
                success: false,
                message: "El identificador de marca no es válido"
            });
        }

        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            return res.status(400).json({
                success: false,
                message: "El precio debe ser un número válido mayor o igual a cero"
            });
        }

        if (!Number.isInteger(numericStock) || numericStock < 0) {
            return res.status(400).json({
                success: false,
                message: "El stock debe ser un entero mayor o igual a cero"
            });
        }

        const validGenders = ["Masculino", "Femenino", "Unisex"];
        const validStatuses = ["draft", "published", "archived"];

        if (gender && !validGenders.includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "El género seleccionado no es válido"
            });
        }

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "El estado del producto no es válido"
            });
        }

        const slug = generateSlug(name);

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "El nombre no permite generar un slug válido"
            });
        }

        const productId = await Product.create({
            brand_id: numericBrandId,
            name: name.trim(),
            slug,
            price: numericPrice,
            description,
            concentration,
            gender,
            fragrance_family,
            top_notes,
            heart_notes,
            base_notes,
            stock: numericStock,
            status: status || "draft"
        });

        res.status(201).json({
            success: true,
            message: "Producto creado correctamente",
            data: {
                id: productId,
                slug
            }
        });

    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Ya existe un producto con ese nombre de URL"
            });
        }

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                success: false,
                message: "La marca seleccionada no existe"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error al crear el producto"
        });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const numericId = Number(id);

        if (!Number.isInteger(numericId) || numericId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Identificador de producto no válido"
            });
        }

        const {
            brand_id,
            name,
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
        } = req.body;

        if (!brand_id || !name || price === undefined || price === null || price === "") {
            return res.status(400).json({
                success: false,
                message: "La marca, el nombre y el precio son obligatorios"
            });
        }

        const numericBrandId = Number(brand_id);
        const numericPrice = Number(price);
        const numericStock = stock === undefined ? 0 : Number(stock);

        if (!Number.isInteger(numericBrandId) || numericBrandId <= 0) {
            return res.status(400).json({
                success: false,
                message: "El identificador de marca no es válido"
            });
        }

        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            return res.status(400).json({
                success: false,
                message: "El precio debe ser un número válido mayor o igual a cero"
            });
        }

        if (!Number.isInteger(numericStock) || numericStock < 0) {
            return res.status(400).json({
                success: false,
                message: "El stock debe ser un entero mayor o igual a cero"
            });
        }

        const validGenders = ["Masculino", "Femenino", "Unisex"];
        const validStatuses = ["draft", "published", "archived"];

        if (gender && !validGenders.includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "El género seleccionado no es válido"
            });
        }

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "El estado del producto no es válido"
            });
        }

        const slug = generateSlug(name);

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "El nombre no permite generar un slug válido"
            });
        }

        const affectedRows = await Product.update(numericId, {
            brand_id: numericBrandId,
            name: name.trim(),
            slug,
            price: numericPrice,
            description,
            concentration,
            gender,
            fragrance_family,
            top_notes,
            heart_notes,
            base_notes,
            stock: numericStock,
            status: status || "draft"
        });

        if (!affectedRows) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Ya existe otro producto con ese slug"
            });
        }

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                success: false,
                message: "La marca seleccionada no existe"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error al actualizar el producto"
        });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const numericId = Number(id);

        if (!Number.isInteger(numericId) || numericId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Identificador de producto no válido"
            });
        }

        const affectedRows = await Product.delete(numericId);

        if (!affectedRows) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error al eliminar el producto"
        });
    }
};
