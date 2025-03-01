const pool = require("./config/database");

async function testConnection() {
  try {
    console.log("⏳ Intentando conectar a la base de datos...");
    console.log("🔍 Variables de entorno:", process.env);

    const [rows] = await pool.query("SELECT 1+1 AS result");

    console.log("✅ Conexión exitosa con MySQL:", rows);
  } catch (error) {
    console.error("❌ Error de conexión con MySQL:", error);
  } finally {
    process.exit(); // Forzar salida después de la prueba
  }
}

testConnection();
