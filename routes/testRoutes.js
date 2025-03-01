const express = require("express");
const pool = require("../config/database"); // Importar la conexión a la BD

const router = express.Router();

router.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1+1 AS result");
    res.json({ success: true, result: rows });
  } catch (error) {
    console.error("❌ Error de conexión con MySQL:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router; // 🔹 Es importante exportar correctamente el router
