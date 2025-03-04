const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://factoria-inteligente-fe.vercel.app"
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 Importar rutas correctamente
const usersRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

app.use("/users", usersRoutes);
app.use("/article", articleRoutes);
app.use("/auth", authRoutes);
app.use("/api", testRoutes); // ✅ Asegúrate de que esté aquí

// Middleware para capturar errores
app.use((err, req, res, next) => {
    console.error("❌ Error en Express:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
