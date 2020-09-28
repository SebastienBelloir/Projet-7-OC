const ShareArticle = require("../models/shareArticle");

exports.sharedArticle = (req, res, next) => {
    const sharedArticle =  {
        sharedIdUser: req.body.sharedIdUser,  
        idArticle: req.body.idArticle,
        commentaire: req.body.commentaire,
    };
    ShareArticle.create(sharedArticle, (err, data) => {
      console.log(sharedArticle, req.body)
      if (err) {
        res.status(500).send({
          message: err.message || "Erreur lors du partage de l'article.",
        });
      } else { 
        res.status(201).send(data); 
      }
    });
  };
  
  exports.findAllSharedArticle = (req, res) => {
    ShareArticle.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Une erreur est survenu lors de la recherche des articles.",
        });
      else res.send(data);
    });
  };