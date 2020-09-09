const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
 
router.post('/createArticle', multer, articleCtrl.createArticle);
router.put('/modify/:idArticles', multer, articleCtrl.modifyArticle);
router.get('/find/:idArticles', articleCtrl.findOne);
router.get('/', articleCtrl.findAll);
router.delete('/delete/:idArticles', articleCtrl.deleteArticle);


module.exports = router