const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("📌 Conectando a la base de datos...");
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3306, // Asegurar que el puerto es un número
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000 // Aumentamos el tiempo de espera
});

module.exports = pool;
