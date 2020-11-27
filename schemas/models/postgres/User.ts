import * as Sequelize from 'Sequelize' 
const db = require('../../../config/database')

const user = db.define('users', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    dob: Sequelize.DATEONLY,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    friendCode:{
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4
    }
}, {
    timestamps: false,
});


module.exports = user;