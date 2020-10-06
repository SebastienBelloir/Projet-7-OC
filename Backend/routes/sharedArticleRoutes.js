// Contient les fonctions qui s'appliquent aux différentes routes pour les articles partagés

const express = require('express'); // Nécessaire pour utiliser le router d'Express
const router = express.Router();// On appelle le routeur d'Express pour pouvoir déporter notre logique de routing dans ce fichier
const auth = require('../middleware/auth');// Récupère notre configuration d'authentification JsonWebToken
const sharedArtlCtrl = require("../controllers/shareArticle");// Récupère les logiques métiers à appliquer à chaque route du CRUD


router.post('/sharearticle', auth, sharedArtlCtrl.sharedArticle);
router.get('/',  sharedArtlCtrl.findAllSharedArticle);
router.delete("/delete/:idArticle", auth, sharedArtlCtrl.deleteSharedArticle);

module.exports = router