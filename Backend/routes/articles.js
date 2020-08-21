const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, articleCtrl.createArticle)
router.put('/:id', auth, multer, articleCtrl.modifyArticle)
router.delete('/:id', auth, articleCtrl.deleteArticle)


module.exports = router