const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path");
const testRoute = require("./routes/testRoute/test-db");

require('dotenv').config();

// Configuración de CORS
const corsOptions = {
    origin:  'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));

// Middleware para trabajar con JSON
app.use(express.json());

app.use(cookieParser()); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Importar y usar las rutas
const usersRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/users', usersRoutes); // Prefijo para las rutas de usuarios
app.use('/article', articleRoutes); // Prefijo para las rutas de usuarios
app.use('/auth',authRoutes)

app.use("/api", testRoute);

module.exports = app;
