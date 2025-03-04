const {
  postArticleService,
  getArticlesNameService,
  getArticlesByPage,
  deleteArticleService,
  getArticleByIdService,
  editArticleService
} = require("../services/articleServices");
const path = require('path');
const fs = require('fs');
const { resourceLimits } = require("worker_threads");


const deleteOldFile = (oldFile) => {
  if (oldFile) {
    const filePath = path.join(__dirname, "../uploads", oldFile);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};



const getArticlesNameController = async (req, res) => {
  try {
    const articles = await getArticlesNameService();
    res.status(200).json({ status: "true", articles });
  } catch (error) {
    res.status(500).json({ status: "false", message: error.message });
  }
};
const getArticlesByPageController = async (req, res) => {
  const page = parseInt(req.params.id) || 1; 
  if (!page) {
    return res.status(400).json({ message: "Debes especificar la página" });
  }

  try {
    let limit = page*20;
    const articles = await getArticlesByPage(page,limit);
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


const getArticleByIdController = async (req,res) =>{
  const { id } = req.params; // Obtén el ID del artículo desde los parámetros de la URL
  if (!id) {
    return res
     .status(400)
     .json({ message: "El ID del artículo es obligatorio" });
  }
  try {
      const article = await getArticleByIdService(id);
      if (!article) {
        return res.status(404).json({ message: "Artículo no encontrado" });
      }
      return res.status(200).json({ status: true, article });
  } catch (error) {
    return res.status(400).json({error:error, message: "articulo no encontrado" });
  }
}

const editArticleByIdController = async (req,res) =>{
   const { id } = req.params
   const {title,published,keywords} = req.body

   try{
    const existingArticle = await getArticleByIdService(id);
    if (!existingArticle) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }
    const fields = ["field1", "field2", "field3", "field4", "field5", "field6"];
    const campos = ["campo1", "campo2", "campo3", "campo4", "campo5", "campo6"];

    const updatedFields = {};
    fields.forEach((field,index) => {
      const campo = campos[index]
      if (req.files?.[field]) {
        console.log(req.files[field][0].filename)
        deleteOldFile(existingArticle[campo])
        updatedFields[campo] = req.files[field][0].filename; // Si es un archivo, se usa el nombre

      } else if (req.body?.[field]) {
        updatedFields[campo] = req.body[field]; // Si está en req.body, se usa el valor enviado
      } else {
        updatedFields[campo] = existingArticle[campo]; // Si no se envió nada, se mantiene el valor anterior
      }
    });

    if (existingArticle.titulo != title){
      updatedFields.titulo= title;
    } else {
      updatedFields.titulo= existingArticle.titulo;
    }
    if (existingArticle.publicado!= published){
      updatedFields.publicado= published;
    } else {
      updatedFields.publicado= existingArticle.publicado;
    }
    if (existingArticle.palabras_clave!= keywords){
      updatedFields.palabras_clave= keywords;
    } else {
      updatedFields.palabras_clave= existingArticle.palabras_clave;
    }

    const response = await editArticleService(id, updatedFields);
    return res.status(200).json({ status: true, response });
   }catch{
     return res.status(500).json({ message: "Error al editar el articulo" });
   }
}

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
        const imagePath = path.join(__dirname, "../uploads", fileName ); 
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
  getArticleByIdController,
  editArticleByIdController
};
