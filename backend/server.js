
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");

const path = require("path");
// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);
// Ruta de prueba
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend de Bohemian-Parfums funcionando correctamente"
    });
});

// Iniciar servidor y comprobar base de datos
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        const connection = await pool.getConnection();

        console.log("Conexión con MySQL establecida correctamente.");

        connection.release();

        app.listen(PORT, () => {
            console.log(
                `Servidor ejecutándose en http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error("Error al conectar con MySQL:", error.message);
        process.exit(1);
    }
}

startServer();
