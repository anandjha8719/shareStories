const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT,
        console.log(`App running in ${process.env.NODE_ENV} on port ${PORT}`)
    )