const { sharedArticle } = require("../controllers/shareArticle");
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

  ShareArticle.getAll = callback => {
    mysqlConnection.query("SELECT * FROM share ORDER BY datetime DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }
  
      console.log("users: ", res);
      callback(null, res);
    });
  };


  ShareArticle.delete = (idArticle, callback) => {
    mysqlConnection.query(
      "DELETE FROM share WHERE idArticle = ?",
      idArticle,
      (err, res) => {
        if (err) {
          console.log("erreur : ", err);
          callback(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          callback({ kind: "non_trouvé" }, null);
          return;
        }

        console.log("Suppression de l'article ayant pour id: ", idArticle);
        callback(null, res);
      }
    );
  };
   
  module.exports = ShareArticle; 