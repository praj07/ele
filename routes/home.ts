import * as express from 'express';
import  * as Sequelize from 'Sequelize';
const router = express.Router();
const User = require("../schemas/models/postgres/User");
const Todo = require("../schemas/models/postgres/Todo");
const EOLSuggestions = require("../schemas/models/postgres/EOLSuggestions");
router.get('/', async (req, res) => {
    const userId = req.signedCookies.user_id
    if (!userId) {
        return res.redirect("/")
    }
    const user = await User.findOne({
        where: {
            id:  userId,
        }
    });
    const todos = await Todo.findAll({
        where: {
            date : { [Sequelize.Op.gte]: Date.now() },
            owner : userId,
        },
    });
    const todosToday = await Todo.findAndCountAll({
        where : {
            date: { [Sequelize.Op.gte]: Date.now() },
            owner : userId,
        }
    });

    const completed = await Todo.findAll({
        where: {
            date : { [Sequelize.Op.lt]: Date.now() },
            owner : userId,
        },
    });

    const completedCount = await Todo.findAndCountAll({
        where: {
            date : { [Sequelize.Op.lt]: Date.now() },
            owner : userId,
        },
    });

    const eolsuggestions = await EOLSuggestions.findAll();

    const todosTodayCount = todosToday.count;
    const eventsPlularized = todosTodayCount == 1 ? '1 event' : (todosTodayCount == 0 ? 'No events' : `${todosTodayCount} events`);
    
    const completedEventsCount = completedCount.count;
    const completedPlularized = completedEventsCount == 1 ? '1 event' : (completedEventsCount == 0 ? 'No events' : `${completedEventsCount} events`);
    const hourOfDay = new Date().getHours();
    
    
    let greeting = hourOfDay < 12 ? "Good morning" : ( hourOfDay < 17 ? "Good afternoon" : "Good evening");
    res.render('home', {
        user,
        greeting,
        todosTodayCount,
        eventsPlularized,
        todos,
        completed,
        completedPlularized,
        eolsuggestions,
    })
});

module.exports = router;