const pool = require("../config/database.js");

const postArticleService = async (obj) => {
  let datePublished = null;
  let dateUpdated = null;
  if (obj.published) {
    const currentDate = new Date();
    datePublished = currentDate.toLocaleDateString("en-CA");
    dateUpdated = currentDate.toLocaleDateString("en-CA");
  }

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

  try {
  } catch (err) {
    console.error(err);
    throw new Error("Error in creating post article");
  }
};

module.exports = { postArticleService };
