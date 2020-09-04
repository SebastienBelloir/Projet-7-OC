const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const userRoutes = require('./routes/user');
const articlesRoutes = require('./routes/articles');



app.use(cors());
app.use(helmet());
app.use(bodyParser.json());




app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/user', userRoutes);
app.use('/articles', articlesRoutes);




module.exports = app; 