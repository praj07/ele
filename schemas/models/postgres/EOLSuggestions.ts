import * as Sequelize from 'Sequelize' 
const db = require('../../../config/database')

const suggestions= db.define('eolsuggestions', {
    title: Sequelize.STRING, 
    isScheduled: Sequelize.BOOLEAN,
    short_desc: Sequelize.STRING,  
    long_desc: Sequelize.STRING,
    instructions: Sequelize.STRING,
}, {
    id: false,
    timestamps: false,
});
module.exports = suggestions;