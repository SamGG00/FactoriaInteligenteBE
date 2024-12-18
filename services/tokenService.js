const jwt=require("jsonwebtoken")

/**
 * Genera un token JWT con el payload proporcionado.
 * @param {Object} payload - Información que se incluirá en el token.
 * @param {string} secretKey - Clave secreta para firmar el token (se recomienda usar variables de entorno).
 * @param {string} expiresIn - Tiempo de expiración del token (por ejemplo, '1h', '7d').
 * @returns {string} - Token JWT generado.
 */


const generateToken = (payload, secretKey = process.env.SECRET_JWT_KEY, expiresIn = '1h') => {
    if (!secretKey) {
      throw new Error('La clave secreta JWT no está definida');
    }
    
    try {
      const token = jwt.sign(payload, secretKey, { expiresIn });
      return token;
    } catch (error) {
      console.error('Error al generar el token:', error);
      throw new Error('No se pudo generar el token');
    }
  };
  
  module.exports = { generateToken };