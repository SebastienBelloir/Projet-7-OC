const mysqlConnection = require('../mysqlConnection');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');


exports.signup = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.create(user, (err, data) => {
        brcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    departement: req.body.departement_entreprise,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    });
};

exports.login = (req, res, next) => {
    const userReq = req.body.username
    const passReq = req.body.password
    if (userReq && passReq) {
        mysqlConnection.query('SELECT * FROM groupomania_sqldb.users WHERE username= ?', userReq, function (_error, results, _fields) {
            if (results.length > 0) {
                bcrypt.compare(passReq, results[0].password).then((valid) => {
                    if (!valid) {
                        res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
                    } else {
                        console.log(userReq, "s'est connecté")
                        let privilege = '';
                        if (results[0].isadmin === 1) {
                            privilege = 'admin';
                        } else {
                            privilege = 'member';
                        }
                        res.status(200).json({
                            userId: results[0].idUser,
                            username: results[0].nom,
                            name: results[0].prenom,
                            email: results[0].email,
                            privilege: privilege,
                            token: jsonWebToken.sign(
                                { userId: results[0].idUser, role: privilege },
                                'hLq^hNoHp{Vw)c`HWHGwAq#vm&)1nX',
                                { expiresIn: '24h' }
                            )
                        })
                    }
                })
            } else {
                res
                    .status(401)
                    .json({ message: 'Utilisateur ou mot de passe inconnu' })
            }
        }
        )
    } else {
        res
            .status(500)
            .json({ message: "Entrez un nom d'utilisateur et un mot de passe" })
    }
}

exports.getAllUsers = (req, res, next) => {
    conn.query(
        'SELECT idUser, nom, prenom, email, departement_entreprise, isadmin, FROM groupomania_sqldb.users',
        function (error, results, fields) {
            if (error) {
                return res.status(400).json(error)
            }
            return res.status(200).json({ results })
        }
    )
}

exports.deleteUser = (req, res, next) => {
    mysqlConnection.query(
        `DELETE FROM users WHERE idUSERS=${req.params.id}`,
        req.params.id,
        function (error, results, fields) {
            if (error) {
                return res.status(400).json(error)
            }
            return res
                .status(200)
                .json({ message: 'Votre compte a bien été supprimé !' })
        }
    )
}