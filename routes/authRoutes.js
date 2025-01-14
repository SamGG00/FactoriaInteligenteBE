const express = require("express");
const router = express.Router();
const { authController, validateToken } = require("../controllers/AuthController");

router.post("/login", authController); // Asegúrate de que 'authController' esté definido
router.get("/validateToken", validateToken); // Asegúrate de que 'validateToken' esté definido
router.post("/logout", (req, res) => {
  res.clearCookie("authToken"); // Elimina la cookie
  res.status(200).json({ message: "Sesión cerrada exitosamente" });
});

module.exports = router;
