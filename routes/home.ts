import * as express from 'express';
import  * as Sequelize from 'Sequelize';
const router = express.Router();
const User = require('../schemas/models/postgres/User');
const Todo = require("../schemas/models/postgres/Todo");

router.get('/', async (req, res) => {

    const userId = req.signedCookies.user_id
    const user = await User.findOne({
        where: {
            id:  userId,
        }
    });
    const todos = await Todo.findAll({
        where: {
            deadline : { [Sequelize.Op.gte]: Date.now() },
            owner : userId,
            isCompleted: false,
        },
    });
    const todosToday = await Todo.findAndCountAll({
        where : {
            isCompleted: false,
            deadline : Date.now(), 
        }
    });
    const todosTodayCount = todosToday.count;
    const eventsPlularized = todosTodayCount == 1 ? 'event' : 'events'
    const hourOfDay = new Date().getHours();
    let greeting = hourOfDay < 12 ? "Good morning" : ( hourOfDay < 17 ? "Good afternoon" : "Good evening");
    res.render('home', {
        user,
        greeting,
        todosTodayCount,
        eventsPlularized,
        todos,
    })
});

// router.

module.exports = router;