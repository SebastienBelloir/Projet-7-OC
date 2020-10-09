// Middleware qui vient vérifier le TOKEN à chaque emprunt d'une route 

const User = require('../models/user');
const jsonWebToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ') [1]; // Récupération du token dans l'entête
        const decodedToken = jsonWebToken.verify(token, 'hLq^hNoHp{Vw)c`HWHGwAq#vm&)1nX'); // on vérifie le token avec la clé pour lire ce token
        const userId = decodedToken.userId; // Le token devient un objet JS classique qu'on place dans une constante, et on y récupère l'user ID pour comparaison le cas échéant
        console.log(userId)
        User.findById(userId, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Customer with id ${userId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error retrieving Customer with email" + userId
                });
              }
            } else {
                
                req.body = req.body;
                req.user = data;
                req.body.userId = data.idUser;
                req.body.auteur_id = data.idUser;
                req.body.isAdmin = data.isAdmin;
                console.log("middlewareauth", req.body);
                next()
            };
          });
        
        // if (req.body.idUser && req.body.idUser !== userId) {
        //     throw 'User ID non valable';
        // } else {
        //     next();
        // }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' }) 
    }
}