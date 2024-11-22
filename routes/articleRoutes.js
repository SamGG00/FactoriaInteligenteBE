const express = require("express");
const {
  postArticleController,
  getArticlesNameController,
  getArticlesByPageController,
} = require("../controllers/ArticleControllers");
const { uploadFields } = require("../services/imageService"); // Configuración de Multer
const router = express.Router();

router.post("/newArticle", uploadFields, postArticleController);
router.get("/articlesName", getArticlesNameController);
router.get("/articles", getArticlesByPageController);


module.exports = router;
