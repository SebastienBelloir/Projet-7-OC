const mysqlConnection = require('../mysqlConnection');


exports.createArticle = (req, res, next) => {
    const article = req.body;
    mysqlConnection.query('INSERT INTO articles SET ?', article, function (
        error,
        results,
        fields
    ) {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(201).json({ message: 'Votre article a bien été publié !' })
    })
}

exports.modifyArticle = (req, res, next) => {
    mysqlConnection.query('SELECT * FROM articles WHERE idArticles=?', req.params.id,
        function (error, results, fields) {
            if (error) {
                return res.status(400).json(error)
            }
            const updatedMessage = req.body
            mysqlConnection.query(
                'UPDATE articles SET ? WHERE idArticles=?',
                [updatedMessage, req.params.id],
                function (error, results, fields) {
                    if (error) {
                        return res.status(400).json(error)
                    }
                    return res
                        .status(200)
                        .json({ message: 'Votre article a bien été modifié !' })
                }
            )
        }
    )
}

exports.deleteArticle = (req, res, next) => {
    mysqlConnection.query(
        'SELECT * FROM articles WHERE idArticles=?',
        req.params.id,
        function (error, results, fields) {
            if (error) {
                return res.status(400).json(error)
            }
            mysqlConnection.query(
                `DELETE FROM articles WHERE idArticles=${req.params.id}`,
                req.params.id,
                function (error, results, fields) {
                    if (error) {
                        return res.status(400).json(error)
                    }
                    return res
                        .status(200)
                        .json({ message: 'Votre article a bien été supprimé !' })
                }
            )
        }
    )
}
