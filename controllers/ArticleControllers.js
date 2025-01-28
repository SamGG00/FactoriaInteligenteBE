
const express= require('express')
const {postArticleService,getArticlesNameService,getArticlesService,getArticlesByPage}= require('../services/articleServices')
const { uploadImage } = require("../services/imageService.js");

const getArticlesNameController= async (req,res) => {
  try{
    const articles = await getArticlesNameService();
    res.status(200).json({ status: "true", articles });
  }
  catch(error){
    res.status(500).json({ status: "false",message: error.message });
  }
}
const getArticlesByPageController = async (req,res) => {
  const page = parseInt(req.query.page) || 1;  // Obtén la página desde la query string (si no está definida, usa 1)
  if (!page){
    return res.status(400).json({ message: "Debes especificar la página"});
  }

  try{
    const articles = await getArticlesByPage(page);
    res.status(200).json({ status: "true", articles });
    
  }catch(error){
    res.status(500).json({ status: "false",message: error.message });
  }
}

const postArticleController=async (req,res)=>{

  console.log(req.body);
    const {title,published,keywords,author}=req.body;
    // Validar que el archivo sea una imagen y si es imagen colocar en la carpeta uploads
    const field1 = req.file ? `/uploads/${req.file.filename}` : req.body.field1 || null;
    const field2 = req.file ? `/uploads/${req.file.filename}` : req.body.field2 || null;
    const field3 = req.file ? `/uploads/${req.file.filename}` : req.body.field3 || null;
    const field4 = req.file ? `/uploads/${req.file.filename}` : req.body.field4 || null;
    const field5 = req.file ? `/uploads/${req.file.filename}` : req.body.field5 || null;
    const field6 = req.file ? `/uploads/${req.file.filename}` : req.body.field6 || null;

    if(!title||!published
     ||!keywords||!author
    ){
        return res.status(400).json({message:"Todos los campos son obligatorios"})
    }
    try{
        const article={
            title,
            published,
            keywords,
            author,
            field1,
            field2,
            field3,
            field4,
            field5,
            field6
        }

        const isImage = (file) => {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
            return file && allowedMimeTypes.includes(file.mimetype);
          };
      
          if (field1) {
            if (isImage(field1)) {
              const req = { file: field1 };
              const imagePath = await uploadImage(req);
              article.field1 = imagePath;
            }
          }
   
          if (field2) {
            if (isImage(field2)) {
              const req2 = { file: field2 };
              const imagePath2 = await uploadImage(req2);
              article.field2 = imagePath2;
            } 
          }
      
          if (field3) {
            if (isImage(field3)) {
              const req3 = { file: field3 };
              const imagePath3 = await uploadImage(req3);
              article.field3 = imagePath3;
            } 
          }

          if (field4) {
            if (isImage(field4)) {
              const req4 = { file: field4 };
              const imagePath4 = await uploadImage(req4);
              article.field4 = imagePath4;
            } 
          }

          if (field5) {
            if (isImage(field5)) {
              const req5 = { file: field5 };
              const imagePath5 = await uploadImage(req5);
              article.field5 = imagePath5;
            } 
          }

          if (field6) {
            if (isImage(field6)) {
              const req6 = { file: field6 };
              const imagePath6 = await uploadImage(req6);
              article.field6 = imagePath6;
            } 
          }
        const response=await postArticleService(article);
        return res.status(201).json({status: true, response:response})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Error al crear el articulo"})
    }
}

const deleteArticleController=async (req,res) => {
  
}



module.exports={postArticleController,getArticlesNameController,getArticlesByPageController}