import * as express from 'express';
import  * as Sequelize from 'Sequelize';
const router = express.Router();
const User = require('../schemas/models/postgres/User');
const Todo = require("../schemas/models/postgres/Todo");
import { uuid } from 'uuidv4';

router.get('/', async (req, res) => {

    const userId = req.signedCookies.user_id
    const user = await User.findOne({
        where: {
            id:  userId,
        }
    });
    const todos = await Todo.findAll({
        where: {
            deadline : { $gte: Date.now() },
            owner : userId,
            isCompleted: false,
        },
    });
    const todosToday = await Todo.findAndCountAll({
        where : {
            deadline : Date.now(), 
        }
    })
    const todosTodayCount = todosToday.count;
    const eventsPlularized = todosTodayCount > 1 ? 'events' : 'event'
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