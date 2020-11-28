import express from 'express';
const db = require('./config/database');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const authMiddleware = require('./routes/middleware');
// const insecureHandlers = allowInsecurePrototypeAccess(exphbs);

try {
    db.authenticate()
    .then(() => console.log('connection has been established successfully'));
} catch (err) {
    console.log('failed to create a connection');
};

const app = express();


app.engine('handlebars', exphbs( { defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(handlebars) }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('ele_in_the_room'));
// parse application/json
app.use(bodyParser.json())
const port = 3000;

app.use('/home', authMiddleware.ensureLoggedIn, require('./routes/home'));
app.use('/add', authMiddleware.ensureLoggedIn, require('./routes/add'));

app.use('/auth', require('./routes/auth'));
app.get('/', (req, res) => {
  res.render('login', { layout : 'landing' });
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});