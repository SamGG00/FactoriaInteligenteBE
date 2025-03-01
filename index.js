const app = require("./app");

const PORT = process.env.DB_PORT || 3000; 

console.log("📌 Iniciando el servidor...");
console.log(`🔍 Puerto asignado por Railway: ${PORT}`);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
