const mysqlConnection = require('../mysqlConnection');
const Article = require('../models/articles');


exports.createArticle = (req, res, next) => {
    const article = {
        "title": req.body.title,
        "contenu": req.body.contenu,
        "time": req.body.time,
        "auteur": req.body.auteur
    };
    Article.create(article, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
            err.message || "Erreur lors de la création de l'article."
          });
        } else {
          res.status(201).send(data);
        }
      });
    }

exports.modifyArticle = (req, res) => {
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        Article.modify(
          req.params.idArticles,
          new Article(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Article avec id ${req.params.idArticles} non trouvé.`
                });
              } else {
                res.status(500).send({
                  message: "Problème lors de la modification de l'article avec l'id " + req.params.idArticles
                });
              }
            } else res.send(data);
          }
        );
      };

exports.deleteArticle = (req, res) => {
        Article.delete(req.params.idArticles, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Article avec id ${req.params.idArticles} non trouvé.`
              });
            } else {
              res.status(500).send({
                message: "Problème lors de la suppression de l'article avec l'id " + req.params.idArticles
              });
            }
          } else res.send({ message: `L'article a été supprimé.` });
        });
      };