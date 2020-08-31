const mysqlConnection = require("../mysqlConnection");


const User = function(user) {
  this.nom = user.nom;
  this.prenom = user.prenom;
  this.email = user.email;
  this.departement = user.departement_entreprise;
  this.admin = user.isadmin;
  this.password = user.password;
};

User.create = (newUser, callback) => {
  mysqlConnection.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("User created: ", { id: res.insertId, ...newUser });
    callback(null, { id: res.insertId, ...newUser });
  });
};

User.findByEmail = (email, callback) => {
  mysqlConnection.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(null, err);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      callback(null, res[0]);
      return;
    }

    callback({kind: "user not found"}, null);
  });
};

User.getAll = callback => {
  mysqlConnection.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(null, err);
      return;
    }

    console.log("users: ", res);
    callback(null, res);
  });
};


User.delete = (id, callback) => {
  mysqlConnection.query("DELETE FROM users WHERE idUser = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      callback({ kind: "not_found" }, null);
      return;
    }

    console.log("Suppression de l'utilisateur ayant pour id: ", id);
    callback(null, res);
  });
};

module.exports = User;