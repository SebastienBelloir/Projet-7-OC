const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
 
router.post('/createArticle', auth, multer, articleCtrl.createArticle);
router.put('/modify/:idArticles', auth,  multer, articleCtrl.modifyArticle);
router.get('/find/:idArticles', auth, articleCtrl.findOne);
router.get('/', auth, articleCtrl.findAll);
router.delete('/delete/:idArticles', auth, articleCtrl.deleteArticle);


module.exports = router