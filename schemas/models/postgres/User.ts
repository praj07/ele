import * as Sequelize from 'Sequelize' 
const db = require('../../../config/database')

const user = db.define('users', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    dob: Sequelize.DATEONLY,
    password: Sequelize.STRING,
    friendCode:{
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4}
}, {
    timestamps: false,
});

module.exports = user;