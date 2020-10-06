const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
 
router.post('/createArticle', auth, multer, articleCtrl.createArticle);
router.put('/modify/:idArticle', auth,  multer, articleCtrl.modifyArticle);
router.get('/find/:idArticle',  articleCtrl.findOne);
router.get('/',  articleCtrl.findAll);
router.delete('/delete/:idArticle', auth,  articleCtrl.deleteArticle);


module.exports = router