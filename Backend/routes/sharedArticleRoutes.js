const express = require('express');
const router = express.Router();
const sharedArtlCtrl = require("../controllers/shareArticle");


router.post('/sharearticle', sharedArtlCtrl.sharedArticle);

module.exports = router