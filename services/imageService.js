const multer = require("multer");
const path = require("path");


// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta para guardar los archivos
  },
  filename: (req, file, cb) => {
    cb(null, "hvj_bp_"+ Date.now() + path.extname(file.originalname)); // Nombre único
  },
});

// Configuración general de Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Máximo 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Archivo aceptado
    } else {
      cb(new Error("Sólo se permiten imágenes"), false); // Rechazado
    }
  },
});

// Configuración para manejar múltiples archivos
const uploadFields = upload.fields([
  { name: "field1", maxCount: 1 },
  { name: "field2", maxCount: 1 },
  { name: "field3", maxCount: 1 },
  { name: "field4", maxCount: 1 },
  { name: "field5", maxCount: 1 },
  { name: "field6", maxCount: 1 },
]);

module.exports = { uploadFields };
