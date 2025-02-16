const express = require("express");
const {
  postArticleController,
  getArticlesNameController,
  getArticlesByPageController,
  deleteArticleController,
  getArticleByIdController,
  editArticleByIdController
} = require("../controllers/ArticleControllers");

const { uploadFields } = require("../services/imageService"); // Configuración de Multer
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/newArticle",authenticateToken, uploadFields, postArticleController);
router.put("/article/:id", authenticateToken,uploadFields, editArticleByIdController)
router.get("/articlesName", authenticateToken, getArticlesNameController);
router.delete("/article/:id",authenticateToken, deleteArticleController);

router.get("/articles",  getArticlesByPageController);
router.get("/:id",  getArticleByIdController)
module.exports = router;
