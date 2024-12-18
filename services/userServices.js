const pool = require('../config/database.js');
const bcrypt=require('bcrypt');


const encryptPassword= async(password)=>{
  const saltRounds=10;
  const hashedPassword=await bcrypt.hash(password,saltRounds);

  return hashedPassword;
}

const getAllUsersService = async () => {
    try {
      const [rows] = await pool.execute('SELECT * FROM usuarios'); // Ejecuta la consulta y espera el resultado
      console.log("Usuarios:", rows);
      return rows; // Devuelve los resultados
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error; // Lanza el error si algo falla
    }
  };

const postUserService= async(obj)=>{
    const {user, password,name,name2,last_name,last_name2}=obj
    if(!user ||!password ||!name ||!last_name){
        return 'Todos los campos son obligatorios'
    }
    try{
      const [result]=await pool.execute('SELECT * FROM usuarios WHERE usuario = ?',
        [user]
      )
      if(result.length>0){
          return 'El usuario ya existe'
      }
  
      const hashedPassword=await encryptPassword(password);

      const [response]=await pool.execute('INSERT INTO usuarios (usuario,contraseña,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido) VALUES (?,?,?,?,?,?)',
        [user, hashedPassword, name, name2, last_name, last_name2]
      )
      console.log('usuario insertado:')
      return response;
    }catch(err){
      console.error('Error al insertar el usuario:', err);
      throw err; // Lanza el error si algo falla
    }
   

   
}

module.exports={getAllUsersService,postUserService}
