const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/postArticle', articleCtrl.createArticle);
router.put('/:id', articleCtrl.modifyArticle);
router.get('/', articleCtrl.findAll);
router.delete('/:articleId', articleCtrl.deleteArticle);


module.exports = router