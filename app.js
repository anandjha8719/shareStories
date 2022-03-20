const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');

const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

require('./config/passport')(passport)

connectDB();


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(
    session({
        secret: 'something',
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')))


app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));










const PORT = process.env.PORT || 3000;

app.listen(PORT,
        console.log(`App running in ${process.env.NODE_ENV} on port ${PORT}`)
    )