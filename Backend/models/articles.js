// Intéraction avec la base de donnée SQL

const mysqlConnection = require("../mysqlConnection");

const Article = function(article) {
    this.title = article.title;
    this.description = article.description;
    this.contenu = article.contenu;
    this.auteur = article.auteur;
  };

  Article.create = (newArticle, callback) => { // Création d'un article en BDD
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


  Article.modify = (idArticle, article, callback) => { // modification d'un article en BDD
    mysqlConnection.query(
      "UPDATE articles SET title = ?, description = ?, contenu = ?, datetime = NOW(), auteur_id = ? WHERE idArticle = ?",
      [article.title, article.description, article.contenu, article.auteur, idArticle],
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
  
        console.log("Article modifié: ", { id: idArticle, ...article });
        callback(null, { id: idArticle, ...article });
      }
    );
  };

  Article.getAll = callback => { // récupération de tous les articles présent en BDD
    mysqlConnection.query("SELECT * FROM articles ORDER BY datetime DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }
  
      console.log("users: ", res);
      callback(null, res);
    });
  };

  Article.findById = (idArticle, callback) => { // récupération d'un article en particulier présent en BDD
    mysqlConnection.query(`SELECT * FROM articles WHERE idArticle = ${idArticle}`, (err, res) => {
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

  Article.delete = (idArticle, callback) => { // suppression d'un article particulier présent en BDD
    mysqlConnection.query("DELETE FROM articles WHERE idArticle = ?", idArticle, (err, res) => {
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
    });
  };
   
  module.exports = Article; 