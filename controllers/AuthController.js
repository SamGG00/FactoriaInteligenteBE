
const express = require('express')
const { authUserService } = require('../services/authService')
const { generateToken } = require('../services/tokenService')
const jwt = require("jsonwebtoken")


const authController = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' })
  }

  const user = await authUserService(username, password)
  if (!user.status) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }


  const payload = {
    id: user.id,
    username: user.user,

  };
  const token = generateToken(payload, "5h"); // Token válido por 5 h

  res.cookie('authToken', token, {
    httpOnly: true, // Previene el acceso desde JavaScript
    secure: true, // Cambiar a true solo en producción (cuando uses HTTPS)
    /*  sameSite: 'None',  */// Esto es importante si estás trabajando con un frontend en otro dominio
    maxAge: 5 * 60 * 60 * 1000, // 5 horas
  });


  return res.status(200).json({ status: true, message: "Inicio de sesión exitoso", user: user.user, id: user.id })

}


const validateToken = (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ status: false, message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ status: true, user: decoded });
  } catch (err) {
    return res.status(403).json({ status: false, message: 'Token inválido o expirado' });
  }
};


module.exports = { authController, validateToken }