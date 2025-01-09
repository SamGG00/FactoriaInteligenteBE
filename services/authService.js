const pool = require("../config/database.js");
const bcrypt = require('bcrypt');

// Función para verificar la contraseña utilizando bcrypt
const isMatch = (password, hashedPassword) => {
  // Compare the plaintext password with the hashed password using bcrypt's compareSync method.
  return bcrypt.compareSync(password, hashedPassword);
};

const authUserService= async(user,password) =>{
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM usuarios WHERE usuario = ?",[user]
      );
      if(rows.length===0){
        return false
      }
      const hashedPassword=rows[0].contraseña
      const isMatched= isMatch(password,hashedPassword)
      if (isMatched){
        return {status:true,id:rows[0].id,user:rows[0].usuario};
      }
      
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return error
    }
  }

module.exports={authUserService}