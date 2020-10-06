// Contient les fonctions qui s'appliquent aux différentes routes pour les articles

const express = require('express'); // Nécessaire pour utiliser le router d'Express
const router = express.Router();// On appelle le routeur d'Express pour pouvoir déporter notre logique de routing dans ce fichier
const articleCtrl = require('../controllers/articles');// Récupère les logiques métiers à appliquer à chaque route du CRUD
const auth = require('../middleware/auth');// Récupère notre configuration d'authentification JsonWebToken
const multer = require('../middleware/multer-config');// Récupère notre configuration 'multer' pour traitement des fichiers images
 
router.post('/createArticle', auth, multer, articleCtrl.createArticle);
router.put('/modify/:idArticle', auth,  multer, articleCtrl.modifyArticle);
router.get('/find/:idArticle',  articleCtrl.findOne);
router.get('/',  articleCtrl.findAll);
router.delete('/delete/:idArticle', auth,  articleCtrl.deleteArticle);


module.exports = router