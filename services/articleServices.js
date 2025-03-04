const pool = require("../config/database.js");

const getArticlesService = async () => {
  try {
    const [rows] = await pool.execute(
      "SELECT titulo,fecha_actualizado,fecha_publicado,publicado,autor FROM articulos"
    );
    return rows;
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    return error;
  }
};

const getArticleByIdService = async (id) => {
  try {
    const [row] = await pool.execute(
      "SELECT titulo,fecha_actualizado,fecha_publicado,publicado,autor,campo1,campo2,campo3,campo4,campo5,campo6,palabras_clave FROM articulos WHERE id_articulo=?",
      [id]
    );
    return row[0];
  } catch (error) {
    console.error("Error al obtener artículo por id:", error);
    return error;
  }
};

const getArticlesNameService = async () => {
  try {
    const [row] = await pool.execute(
      "SELECT titulo,fecha_actualizado,fecha_publicado,publicado,autor FROM articulos"
    );
    return row;
  } catch (error) {
    console.error("Error al obtener nombres de los  artículos:", error);
    return error;
  }
};

const getArticlesByPage = async (page = 1, limit = 20) => {
  try {
    const offset = (page - 1) * limit;
    const [response] = await pool.execute(
      `SELECT 
          articulos.id_articulo, 
          articulos.titulo, 
          articulos.fecha_actualizado, 
          articulos.fecha_publicado, 
          articulos.publicado, 
          usuarios.primer_nombre,
          usuarios.primer_apellido
       FROM articulos
       LEFT JOIN usuarios ON articulos.autor = usuarios.id
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    if (response.length === 0) {
      return { status: false, message: "No hay artículos" };
    }
    return response;
  } catch (error) {
    console.error(error); // Es importante registrar el error para diagnóstico
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
      "INSERT INTO articulos (titulo,publicado,palabras_clave,campo1,campo2,campo3,campo4,campo5,campo6,fecha_publicado,fecha_actualizado,autor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        obj.title,
        obj.published,
        obj.keywords,
        obj.field1 ? obj.field1 : null,
        obj.field2 ? obj.field2 : null,
        obj.field3 ? obj.field3 : null,
        obj.field4 ? obj.field4 : null,
        obj.field5 ? obj.field5 : null,
        obj.field6 ? obj.field6 : null,
        datePublished,
        dateUpdated,
        obj.author,
      ]
    );
    const { insertId } = response;
    console.log("Articulo insertado:", insertId);
    return response.insertId;
  } catch (err) {
    console.error(err);
    throw new Error("Error in creating post article");
  }
};

const editArticleService = async (idArticle, data) => {
  if (!idArticle) {
    return { status: false, message: "idArticle not found" };
  }
  try {
    const fieldsToUpdate = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const query = `UPDATE articulos SET ${fieldsToUpdate} WHERE id_articulo = ?`;
    const [result] = await pool.execute(query, [data.campo1, data.campo2, data.campo3, data.campo4, data.campo5, data.campo6, 
      data.titulo, data.publicado, data.palabras_clave, idArticle]);
    if (result.affectedRows === 0) {
      return {
        status: false,
        message: "No se encontró el artículo o no hubo cambios",
      };
    }
    return { status: true, message: "Artículo actualizado correctamente" };
  } catch (err) {
    console.error(err);
    throw new Error("Error in updating post article");
  }
};

const deleteArticleService = async (idArticle) => {
  try {
    const query = "DELETE FROM articulos WHERE id_articulo = ?";
    const [response] = await pool.execute(query, [idArticle]);
    if (response.affectedRows > 0) {
      return { status: true };
    } else {
      return { status: false };
    }
  } catch (err) {
    throw new Error(`Error in deleting post article ${err}`);
  }
};

module.exports = {
  postArticleService,
  getArticlesNameService,
  getArticlesService,
  getArticlesByPage,
  deleteArticleService,
  getArticlesService,
  getArticleByIdService,
  editArticleService
};
