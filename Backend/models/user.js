const mysqlConnection = require("../mysqlConnection");


const User = function(user) {
  this.email = user.email;
  this.name = user.nom;
  this.prenom = user.prenom;
  this.password = user.password;
  this.departement = user.departement_entreprise;
};

User.createUser = (newUser, result) => {
  mysqlConnection.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("User created: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getAllUsers = result => {
  mysqlConnection.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};


User.deleteUser = (id, result) => {
  mysqlConnection.query("DELETE FROM users WHERE idUser = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

module.exports = User;