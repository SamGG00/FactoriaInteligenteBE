const jwt=require("jsonwebtoken")

/**
 * Genera un token JWT con el payload proporcionado.
 * @param {Object} payload - Información que se incluirá en el token.
 * @param {string} secretKey - Clave secreta para firmar el token (se recomienda usar variables de entorno).
 * @param {string} expiresIn - Tiempo de expiración del token (por ejemplo, '1h', '7d').
 * @returns {string} - Token JWT generado.
 */


const generateToken = (payload, expiresIn = '1h') => {
    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
      return token;
    } catch (error) {
      console.error('Error al generar el token:', error);
      throw new Error('No se pudo generar el token');
    }
  };
  
  module.exports = { generateToken };