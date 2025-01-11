// middlewares/authMiddleware.js
const express = require("express");
const jwt=require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
  // Primero, extraemos el token de la cookie (o encabezado Authorization)
  const token = req.cookies.authToken|| req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
  }

  try{
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.name_user;
    next();
  }catch(err){
    console.error('JWT Verification Error:', err); // Información adicional para depuración
    return res.status(401).json({ success: false, message: 'Invalid access token' });
  }
  // Verificamos el token
 
};

module.exports ={ authenticateToken}
