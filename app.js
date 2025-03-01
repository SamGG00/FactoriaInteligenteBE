const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// 🔹 Configuración de CORS
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://factoria-frontend.vercel.app",
        "https://factoria-frontend.netlify.app"
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 🔹 Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 Importar rutas correctamente
const usersRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoute = require("./routes/testRoute"); // 🔹 Ahora está bien importado

// 🔹 Usar las rutas
app.use("/users", usersRoutes);
app.use("/article", articleRoutes);
app.use("/auth", authRoutes);
app.use("/api", testRoute); // Ahora funcionará correctamente

module.exports = app;
