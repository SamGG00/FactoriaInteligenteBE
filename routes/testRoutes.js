const express = require("express");
const pool = require("../config/database"); // Importa la conexión a MySQL

const router = express.Router();

router.get("/test-db", async (req, res) => {
  try {
    console.log("📌 Intentando conectar a la base de datos...");
    const [rows] = await pool.query("SELECT 1+1 AS result");
    console.log("✅ Conexión exitosa:", rows);
    res.json({ success: true, result: rows });
  } catch (error) {
    console.error("❌ Error de conexión con MySQL:", error);
    res.status(500).json({ success: false, error: error.message, stack: error.stack });
  }
});



module.exports = router;
