
const express= require('express')
const {authUserService}= require('../services/authService')
const {generateToken}=require('../services/tokenService')


const authController= async (req,res) => {
    const {username,password}=req.body
    if (!username || !password){
        return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }
    
    const user = await authUserService(username,password)
    if (!user.status) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
    
      console.log("controlador return: ", user)
    
    const payload = {
        id: user.id,
        username: user.username,
       
     };
    const token = generateToken(payload, "5h"); // Token válido por 5 h
    
    res.cookie('authToken', token, {
        httpOnly: false, // Evita que el token sea accesible desde JavaScript, cambiar a true en produccion
        secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en produccion
        sameSite: 'strict', // Protege contra ataques CSRF
        maxAge: 5 * 60 * 60 * 1000, // Tiempo de expiración en milisegundos 
      });


    console.log(user)
    res.status(200).json({ status:true, message: "Inicio de sesión exitoso",user:user.user,id:user.id })

}

module.exports = {authController}