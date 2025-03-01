const app = require("./app");

const PORT = process.env.PORT || 3000; // Esto asegura que Railway defina el puerto

console.log("📌 Iniciando el servidor...");
console.log(`🔍 Puerto asignado por Railway: ${PORT}`);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
