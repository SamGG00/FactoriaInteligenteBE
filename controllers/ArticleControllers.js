const {
  postArticleService,
  getArticlesNameService,
  getArticlesByPage,
  deleteArticleService,
  getArticleByIdService
} = require("../services/articleServices");
const path = require('path');
const fs = require('fs');


const getArticlesNameController = async (req, res) => {
  try {
    const articles = await getArticlesNameService();
    res.status(200).json({ status: "true", articles });
  } catch (error) {
    res.status(500).json({ status: "false", message: error.message });
  }
};
const getArticlesByPageController = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  if (!page) {
    return res.status(400).json({ message: "Debes especificar la página" });
  }

  try {
    const articles = await getArticlesByPage(page);
    res.status(200).json({ status: "true", articles });
  } catch (error) {
    res.status(500).json({ status: "false", message: error.message });
  }
};

const postArticleController = async (req, res) => {
  const { title, published, keywords, author } = req.body;
  // validacion d que el archivo sea una imagen y si es imagen colocar en la carpeta uploads
  const field1 = req.files.field1 ? `${req.files.field1[0].filename}` : req.body.field1 || null;
  const field2 = req.files.field2 ? `${req.files.field2[0].filename}` : req.body.field2 || null;
  const field3 = req.files.field3 ? `${req.files.field3[0].filename}` : req.body.field3 || null;
  const field4 = req.files.field4 ? `${req.files.field4[0].filename}` : req.body.field4 || null;
  const field5 = req.files.field5 ? `${req.files.field5[0].filename}` : req.body.field5 || null;
  const field6 = req.files.field6 ? `${req.files.field6[0].filename}` : req.body.field6 || null;

  if (!title || !published || !keywords || !author) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  try {
    const article = {
      title,
      published,
      keywords,
      author,
      field1,
      field2,
      field3,
      field4,
      field5,
      field6,
    };

    const response = await postArticleService(article);
    return res.status(201).json({ status: true, response: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el articulo" });
  }
};

const deleteArticleController = async (req, res) => {
  const { id } = req.params; // Obtén el ID del artículo desde los parámetros de la URL

  if (!id) {
    return res
      .status(400)
      .json({ message: "El ID del artículo es obligatorio" });
  }

  try {
    const article = await getArticleByIdService(id); // Función que obtiene el articulo por su ID
    console.log("esto es article:",article);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    const fields = [
      article.campo1,
      article.campo2,
      article.campo3,
      article.campo4,
      article.campo5,
      article.campo6,
    ];


    fields.forEach((field) => {
      if (field) {
        const fileName = path.basename(field); 
        const imagePath = path.join(__dirname, "../uploads", fileName); 
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    });

    // Elimina el artículo de la base de datos
    const deleteArticle = await deleteArticleService(id); 
     if(deleteArticle.status){
      return res
      .status(200)
      .json({ status: true, message: "Artículo eliminado correctamente" });
     } 
   
  } catch (error) {
    console.error("Error en deleteArticleController:", error);
    return res.status(500).json({ message: "Error al eliminar el artículo" });
  }
};

module.exports = {
  postArticleController,
  getArticlesNameController,
  getArticlesByPageController,
  deleteArticleController,
};
