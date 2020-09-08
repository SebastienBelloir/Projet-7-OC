const mysqlConnection = require("../mysqlConnection");

const Article = function(article) {
    this.title = article.title;
    this.description = article.description;
    this.imageUrl = article.imageUrl;
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

  Article.modify = (idArticles, article, callback) => {
    mysqlConnection.query(
      "UPDATE articles SET title = ?, description = ?, contenu = ?, time_stamp = NOW(), auteur_id = ? WHERE idArticles = ?",
      [article.title, article.description, article.contenu, article.auteur, idArticles],
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
  
        console.log("Article modifié: ", { id: idArticles, ...article });
        callback(null, { id: idArticles, ...article });
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

  Article.findById = (idArticles, callback) => {
    mysqlConnection.query(`SELECT * FROM articles WHERE idArticles = ${idArticles}`, (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        callback(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Article trouvé: ", res[0]);
        callback(null, res[0]);
        return;
      }
  
      callback({ kind: "non_trouvé" }, null);
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