
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// Directorio donde se guardarán las imágenes
const uploadDirectory = path.join(
    __dirname,
    "../uploads/products"
);

// Crear la carpeta automáticamente si no existe
fs.mkdirSync(uploadDirectory, { recursive: true });

// Configuración del almacenamiento
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {

        const extensionMap = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/webp": ".webp"
        };

        const extension = extensionMap[file.mimetype];

        const uniqueName = crypto.randomUUID() + extension;

        cb(null, uniqueName);
    }
});

// Formatos permitidos
const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Formato de imagen no permitido"));
    }
};

// Configuración general de Multer
const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    }
});

module.exports = upload;
