const mysqlConnection = require("../mysqlConnection");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const User = require("../models/user");


exports.signup = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    let user = {
      "nom": req.body.nom,
      "prenom": req.body.prenom,
      "email": req.body.email,
      "departement_entreprise": req.body.departement_entreprise,
      "isadmin": req.body.isadmin,
      "password": hash,
    };
    User.create(user, (err, data) => {
      if (err) {
        res.status(500).send({ 
          message:
          err.message || "Erreur lors de la création de l'utilisateur."
        });
      } else {
        res.status(201).send(data); 
      }
    });
  })
}
 
exports.login = (req, res, next) => {
  const emailReq = req.body.email;
  const passReq = req.body.password;
  if (emailReq && passReq) {
    mysqlConnection.query(
      "SELECT * FROM users WHERE email= ?",
      emailReq,
      function (_error, results, _fields) {
        if (results.length > 0) {
          bcrypt.compare(passReq, results[0].password).then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Utilisateur ou mot de passe inconnu" });
            } else {
              console.log(emailReq, "s'est connecté");
              let privilege = null;
              if (results[0].isadmin === 1) {
                privilege = 1;
              } else {
                privilege = 0;
              }
              res.status(200).json({
                userId: results[0].idUser,
                nom: results[0].nom,
                prenom: results[0].prenom,
                email: results[0].email,
                privilege: privilege,
                token: jsonWebToken.sign(
                  { userId: results[0].idUser, role: privilege },
                  "hLq^hNoHp{Vw)c`HWHGwAq#vm&)1nX",
                  { expiresIn: "24h" }
                ),
              });
            }
          });
        } else {
          res
            .status(401)
            .json({ message: "Utilisateur ou mot de passe inconnu" });
        }
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "Entrez un nom d'utilisateur et un mot de passe" });
  }
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findByEmail = (req, res) => {
  User.findByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with email" + req.params.email
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  User.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur avec l'id ${req.params.id} non trouvé.`
        });
      } else {
        res.status(500).send({
          message: "Suppression de l'utilisateur " + req.params.id + "impossible"
        });
      }
    } else res.send({ message: `Utilisateur supprimé avec succès !` });
  });
};
