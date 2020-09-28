const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sharedArtlCtrl = require("../controllers/shareArticle");


router.post('/sharearticle', auth, sharedArtlCtrl.sharedArticle);
router.get('/', auth, sharedArtlCtrl.findAllSharedArticle);

module.exports = router