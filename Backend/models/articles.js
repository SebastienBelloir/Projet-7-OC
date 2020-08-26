const mysqlConnection = require("../mysqlConnection");

const Article = function(article) {
    this.title = article.title;
    this.contenu = article.contenu;
    this.time = article.time_stamp;
    this.auteur = article.auteur;
  };

  Article.create = (newArticle, callback) => {
    mysqlConnection.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newArticle });
      callback(null, { id: res.insertId, ...newCustomer });
    });
  };

  Article.modify = (idArticle, article, callback) => {
    mysqlConnection.query(
      "UPDATE articles SET title = ?, contenu = ?, time_stamp = ?, autheur_id = ? WHERE idArticles = ?",
      [article.title, article.contenu, article.time_stamp, article.auteur, idArticle],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          callback(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          callback({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { id: idArticle, ...article });
        callback(null, { id: idArticle, ...article });
      }
    );
  };

  Article.delete = (idArticle, callback) => {
    mysqlConnection.query("DELETE FROM articles WHERE idArticles = ?", idArticle, (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted article with id: ", idArticle);
      callback(null, res);
    });
  };
  
  module.exports = Article;