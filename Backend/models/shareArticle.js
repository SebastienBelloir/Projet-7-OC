const mysqlConnection = require("../mysqlConnection");

const ShareArticle = function(sharedArticle) {
    this.sharedIdUser = sharedArticle.sharedIdUser;
    this.idArticle = sharedArticle.idArticle;
    this.commentaire = sharedArticle.commentaire;
  };

  ShareArticle.create = (newSharedArticle, callback) => {
    mysqlConnection.query("INSERT INTO share SET ?", newSharedArticle, (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        callback(err, null);
        return;
      }
  
      console.log("article partagé: ", { id: res.insertId, ...newSharedArticle });
      callback(null, { id: res.insertId, ...newSharedArticle });
    });
  }

  module.exports = ShareArticle; 