const Article = require("../models/articles");


exports.createArticle = (req, res, next) => {
  const article =  {
    title: req.body.title,
    description: req.body.description,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    contenu: req.body.contenu,
    auteur_id: req.body.auteur_id,
  };
  Article.create(article, (err, data) => {
    console.log(article)
    if (err) {
      res.status(500).send({
        message: err.message || "Erreur lors de la création de l'article.",
      });
    } else { 
      res.status(201).send(data); 
    }
  });
};

exports.modifyArticle = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Article.modify(req.params.idArticle, new Article(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Article avec id ${req.params.idArticle} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message:
            "Problème lors de la modification de l'article avec l'id " +
            req.params.idArticle,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Article.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur est survenu lors de la recherche des articles.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Article.findById(req.params.idArticle, (err, data) => {
    if (err) {
      if (err.kind === "non_trouvé") {
        res.status(404).send({
          message: `Article ayant pour id :  ${req.params.idArticle} non trouvé".`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.idArticle
        });
      }
    } else res.send(data);
  });
};

exports.deleteArticle = (req, res) => {
  Article.delete(req.params.idArticle, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Article avec id ${req.params.idArticle} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message:
            "Problème lors de la suppression de l'article avec l'id " +
            req.params.idArticle,
        });
      }
    } else res.send({ message: `L'article a été supprimé.` });
  });
};
