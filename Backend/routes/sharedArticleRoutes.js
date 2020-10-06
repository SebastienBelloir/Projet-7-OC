const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sharedArtlCtrl = require("../controllers/shareArticle");


router.post('/sharearticle', auth, sharedArtlCtrl.sharedArticle);
router.get('/',  sharedArtlCtrl.findAllSharedArticle);
router.delete("/delete/:idArticle", auth, sharedArtlCtrl.deleteSharedArticle);

module.exports = router