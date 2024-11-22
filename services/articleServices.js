const pool = require("../config/database.js");

const getArticlesService= async() =>{
  try {
    const [rows] = await pool.execute(
      "SELECT titulo,fecha_actualizado,fecha_publicado,publicado,autor FROM articulos"
    );
    return rows;
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    return error
  }
}
const getArticlesNameService= async()=>{
  try{
    const [row]=await pool.execute(
      "SELECT titulo,fecha_actualizado,fecha_publicado,publicado,autor FROM articulos"
    );
    return row
  }catch(error){
    console.error("Error al obtener nombres de los  artículos:", error);
    return error
  }
}

const getArticlesByPage = async (page = 1, limit = 20) => {
  try {
    const offset = (page - 1) * limit;
    const [response] = await pool.execute(
      `SELECT id_articulo,titulo, fecha_actualizado, fecha_publicado, publicado, autor 
       FROM articulos 
       LIMIT ? OFFSET ?`,
      [limit, offset]  // Asegúrate de que 'limit' esté primero y luego 'offset'
    );
    return response;
  } catch (error) {
    console.error(error);  // Es importante registrar el error para diagnóstico
    return error;
  }
};


const postArticleService = async (obj) => {
  let datePublished = null;
  let dateUpdated = null;
  if (obj.published) {
    const currentDate = new Date();
    datePublished = currentDate.toLocaleDateString("en-CA");
    dateUpdated = currentDate.toLocaleDateString("en-CA");
  }

  try {
    const [response] = await pool.execute(
      "INSERT INTO articulos (titulo,publicado,palabra_clave1,palabra_clave2,palabra_clave3,campo1,campo2,campo3,campo4,campo5,campo6,fecha_publicado,fecha_actualizado,autor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        obj.title,
        obj.published,
        obj.keyword1,
        obj.keyword2,
        obj.keyword3,
        obj.field1? obj.field1: null,
        obj.field2? obj.field2: null,
        obj.field3? obj.field2: null,
        obj.field4? obj.field3: null,
        obj.field5? obj.field4: null,
        obj.field6? obj.field5: null,
        datePublished,
        dateUpdated,
        obj.author,
      ]
    );
  const { insertId } = response;
  console.log("Articulo insertado:", insertId);
    return response.insertId

  } catch (err) {
    console.error(err);
    throw new Error("Error in creating post article");
  }
};

module.exports = { postArticleService,getArticlesNameService,getArticlesService,getArticlesByPage };
