import * as Sequelize from 'Sequelize' 
const db = require('../../../config/database')

const todo = db.define('todos', {
    title: Sequelize.STRING, //
    deadline: Sequelize.DATEONLY, 
    isCompleted: Sequelize.BOOLEAN,
    description: Sequelize.STRING, // 
    invitees: [ // 
        //array of invitee emails
        Sequelize.STRING,
    ],
    owner: Sequelize.UUIDV4, // 
}, {
    id: false,
    timestamps: false,
});

// todo.create({
//     title: "Water the plants",
//     deadline: Date.now(),
//     isCompleted: false,
//     description: "Make sure to water the plants when i die :) ",
//     invitees: [
//         "miles.morales@hotmail.com",
//         "brucewayne@wayneenterprises.com"
//     ],
//     owner: "9c033929-08de-437e-8f88-0580c8580fa3"
// })
module.exports = todo;