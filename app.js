const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

// Configuración de CORS
const corsOptions = {
    origin:  '*',
    credentials: true,
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));

// Middleware para trabajar con JSON
app.use(express.json());

// Importar y usar las rutas
const usersRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

app.use('/users', usersRoutes); // Prefijo para las rutas de usuarios
app.use('/article', articleRoutes); // Prefijo para las rutas de usuarios

module.exports = app;
