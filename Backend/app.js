// L'application en elle même qui va faire appelle aux différentes fonctions implémentées dans l'API : Accès aux images, aux routes User, aux routes articles

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Pour faciliter le traitement des données contenues dans le corp de la reqûete, le transformant en objet JSON
const path = require('path'); // Pour le middleware express static pour acceder au chemin du système de fichier
const helmet = require('helmet'); // sécurité attaque XSS
const userRoutes = require('./routes/user');
const articlesRoutes = require('./routes/articles');
const sharedArticleRoutes = require('./routes/sharedArticleRoutes')



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // On donne l'accès à toute origine '*'
    res.setHeader( // On donne l'autorisation d'utiliser ces headers sur l'objet réponse
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader( // On donne l'autorisation d'utiliser ces actions aux réponses
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    )
    next()
  })

app.use(helmet());
app.use(bodyParser.json());




app.use('/images', express.static(path.join(__dirname, 'images'))); //Va permettre à l'app de servir le dossier contenant les images, pour le middleware multer
app.use('/users', userRoutes);
app.use('/articles', articlesRoutes);
app.use('/sharedarticles', sharedArticleRoutes);




module.exports = app;  // L'application est exporté pour être 'servi' par le serveur