const mysqlConnection = require("../mysqlConnection");

const Article = function(article) {
    this.title = article.title;
    this.contenu = article.contenu;
    this.auteur = article.auteur;
  };

  Article.create = (newArticle, callback) => {
    mysqlConnection.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        callback(err, null);
        return;
      }
  
      console.log("article créé: ", { id: res.insertId, ...newArticle });
      callback(null, { id: res.insertId, ...newArticle });
    });
  };

  Article.modify = (id, article, callback) => {
    mysqlConnection.query(
      "UPDATE articles SET title = ?, contenu = ?, autheur_id = ? WHERE idArticles = ?",
      [article.title, article.contenu, article.auteur, id],
      (err, res) => {
        if (err) {
          console.log("erreur: ", err);
          callback(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          callback({ kind: "non_trouvé" }, null);
          return;
        }
  
        console.log("Article modifié: ", { id: id, ...article });
        callback(null, { id: id, ...article });
      }
    );
  };

  Article.getAll = callback => {
    mysqlConnection.query("SELECT * FROM articles", (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }
  
      console.log("users: ", res);
      callback(null, res);
    });
  };

  Article.delete = (id, callback) => {
    mysqlConnection.query("DELETE FROM articles WHERE idArticles = ?", id, (err, res) => {
      if (err) {
        console.log("erreur : ", err);
        callback(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        callback({ kind: "non_trouvé" }, null);
        return;
      }
  
      console.log("Suppression de l'article ayant pour id: ", id);
      callback(null, res);
    });
  };
  
  module.exports = Article;