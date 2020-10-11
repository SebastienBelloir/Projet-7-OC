// Contient les fonctions qui s'appliquent aux différentes routes pour les utilisateurs

const express = require('express');// Nécessaire pour utiliser le router d'Express
const router = express.Router(); // On appelle le routeur d'Express pour pouvoir déporter notre logique de routing dans ce fichier
const userCtrl = require('../controllers/user');// Récupère les logiques métiers à appliquer à chaque route du CRUD

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.findAll);
router.get('/find/:id', userCtrl.findOne);
router.delete('/delete/:id', userCtrl.delete);

module.exports = router;


