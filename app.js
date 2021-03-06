const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

require('./config/passport')(passport)

connectDB();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  } = require('./helpers/hbs')
  


app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
    },
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(
    session({
        secret: 'something',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    })
)

app.use(passport.initialize());
app.use(passport.session());

// Setting global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
  })

app.use(express.static(path.join(__dirname, 'public')))


app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));




const PORT = process.env.PORT || 3000;

app.listen(PORT,
        console.log(`App running in ${process.env.NODE_ENV} on port ${PORT}`)
    )