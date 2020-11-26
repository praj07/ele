import express from 'express';
import * as Sequelize from 'Sequelize';
const db = require('./config/database')
const user = require('./schemas/models/postgres/User')


try {
    db.authenticate()
    .then(() => console.log('connection has been established successfully'));
} catch (err) {
    console.log('failed to create a connection');
};



const app = express();
const port = 3000;

app.use('/users', require('./routes/users'));
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});