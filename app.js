const express = require('express');
const app = express();
require('dotenv').config();


// Middleware para trabajar con JSON
app.use(express.json());

// Importar y usar las rutas
const usersRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

app.use('/users', usersRoutes); // Prefijo para las rutas de usuarios
app.use('/article', articleRoutes); // Prefijo para las rutas de usuarios

module.exports = app;
