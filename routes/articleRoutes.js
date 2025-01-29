const express = require("express");
const {
  postArticleController,
  getArticlesNameController,
  getArticlesByPageController,
  deleteArticleController
} = require("../controllers/ArticleControllers");
const { uploadFields } = require("../services/imageService"); // Configuración de Multer
const router = express.Router();
const {authenticateToken}=require("../middleware/authMiddleware")
router.post("/newArticle",uploadFields, postArticleController);
router.get("/articlesName",authenticateToken, getArticlesNameController);
router.get("/articles",authenticateToken,getArticlesByPageController);
router.delete("/article/:id", deleteArticleController);



module.exports = router;
