const express = require("express");
const {
  postArticleController,
  getArticlesNameController,
  getArticlesByPageController,
} = require("../controllers/ArticleControllers");
const { uploadFields } = require("../services/imageService"); // Configuración de Multer
const router = express.Router();
const {authenticateToken}=require("../middleware/authMiddleware")
router.post("/newArticle",authenticateToken, uploadFields, postArticleController);
router.get("/articlesName",authenticateToken, getArticlesNameController);
router.get("/articles",authenticateToken,authenticateToken, getArticlesByPageController);


module.exports = router;
