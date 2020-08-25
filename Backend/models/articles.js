const mysqlConnection = require("../mysqlConnection");

const Article = function(article) {
    this.title = article.title;
    this.contenu = article.contenu;
    this.time = article.time_stamp;
    this.author = article.auteur;
  };

Article.createArticle = (req, res, next) => {
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

Article.modifyArticle = (req, res, next) => {
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

Article.deleteArticle = (req, res, next) => {
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