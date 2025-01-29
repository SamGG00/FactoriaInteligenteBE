const express = require("express");
const {
  postArticleService,
  getArticlesNameService,
  getArticlesByPage,
  deleteArticleService,
  getArticleByIdService
} = require("../services/articleServices");
const { uploadImage } = require("../services/imageService.js");

const getArticlesNameController = async (req, res) => {
  try {
    const articles = await getArticlesNameService();
    res.status(200).json({ status: "true", articles });
  } catch (error) {
    res.status(500).json({ status: "false", message: error.message });
  }
};
const getArticlesByPageController = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Obtén la página desde la query string (si no está definida, usa 1)
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
  const field1 = req.files.field1 ? `/uploads/${req.files.field1[0].filename}` : req.body.field1 || null;
  const field2 = req.files.field2 ? `/uploads/${req.files.field2[0].filename}` : req.body.field2 || null;
  const field3 = req.files.field3 ? `/uploads/${req.files.field3[0].filename}` : req.body.field3 || null;
  const field4 = req.files.field4 ? `/uploads/${req.files.field4[0].filename}` : req.body.field4 || null;
  const field5 = req.files.field5 ? `/uploads/${req.files.field5[0].filename}` : req.body.field5 || null;
  const field6 = req.files.field6 ? `/uploads/${req.files.field6[0].filename}` : req.body.field6 || null;

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

 /*    const isImage = (file) => {
      const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/bmp",
        "image/tiff",
      ];
      return file && allowedMimeTypes.includes(file.mimetype);
    };
    console.log("archivos: ",req.file);
    
    const uploadIfImage = async (field) => {
      if (field && isImage(field)) {
        return await uploadImage({ file: field });
      }
      return field; 
    };
    
    article.field1 = await uploadIfImage(field1);
    article.field2 = await uploadIfImage(field2);
    article.field3 = await uploadIfImage(field3);
    article.field4 = await uploadIfImage(field4);
    article.field5 = await uploadIfImage(field5);
    article.field6 = await uploadIfImage(field6); */

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
    const article = await getArticleByIdService(id); // Función que obtiene el artículo por su ID

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    // 2. Eliminar las imágenes asociadas al artículo
    const fields = [
      article.field1,
      article.field2,
      article.field3,
      article.field4,
      article.field5,
      article.field6,
    ];

    fields.forEach((field) => {
      if (field && field.startsWith("/uploads/")) {
        const imagePath = path.join(__dirname, "..", field); // Construye la ruta completa de la imagen
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Elimina la imagen del sistema de archivos
        }
      }
    });

    // 3. Eliminar el artículo de la base de datos
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
