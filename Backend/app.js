const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const userRoutes = require('./routes/user');
const articlesRoutes = require('./routes/articles');
const sharedArticleRoutes = require('./routes/sharedArticleRoutes')



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    )
    next()
  })

// app.use(cors());
app.use(helmet());
app.use(bodyParser.json());




app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/users', userRoutes);
app.use('/articles', articlesRoutes);
app.use('/sharedarticles', sharedArticleRoutes);




module.exports = app; 