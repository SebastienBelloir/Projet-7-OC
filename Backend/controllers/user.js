const mysqlConnection = require('../mysqlConnection');
const brcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    const user = req.body
    bcrypt.hash(user.password, 10).then((hash) => {
        user.password = hash
        mysqlConnection.query('INSERT INTO users SET ?', user, function (
            error,
            results,
            fields
        ) {
            if (error) {
                console.log(error)
                return res.status(400).json(error.sqlMessage)
            }
            return res.status(201).json({
                message:
                    'Compte créé avec succès'
            })
        })
    })
}

exports.login = (req, res, next) => {
    const userEmail = req.body.email
    const passReq = req.body.password
    if (userEmail && passReq) {
        conn.query(
            'SELECT * FROM groupomania_sqldb.users WHERE email= ?',
            userReq,
            function (_error, results, _fields) {
                if (results.length > 0) {
                    bcrypt.compare(passReq, results[0].password).then((valid) => {
                        if (!valid) {
                            res
                                .status(401)
                                .json({ message: 'Utilisateur ou mot de passe inconnu' })
                        } else {
                            console.log(userReq, "s'est connecté")
                            res.status(200).json({
                                userId: results[0].idUser,
                                email: results[0].Email,
                                token: jsonWebToken.sign(
                                    { userId: results[0].idUser },
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