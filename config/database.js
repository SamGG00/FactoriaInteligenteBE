const mysql = require('mysql2/promise'); // Importa la versión de promesas

require('dotenv').config(); // Carga las variables del .env

// Crear el pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
