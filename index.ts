import express from 'express';
const db = require('./config/database');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
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
const port = 3000;

app.use('/home', require('./routes/home'));
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});