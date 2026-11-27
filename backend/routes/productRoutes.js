
const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productController = require("../controllers/productController");

// Consultas públicas
router.get("/", productController.getPublishedProducts);
router.get("/:slug", productController.getProductBySlug);

// Operaciones administrativas
router.get("/admin/all", productController.getAllProducts);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

//Carga de imágenes
router.post(
    "/:id/images",
    upload.array("images", 5),
    productController.uploadProductImages
);
module.exports = router;
