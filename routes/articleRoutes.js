const express = require('express');
const {PostArticleController} = require('../controllers/ArticleControllers') 
const {uploadFields}= require("../services/imageService"); // Configuración de Multer
const router = express.Router();

router.post("/newArticle", uploadFields, PostArticleController);


module.exports = router;