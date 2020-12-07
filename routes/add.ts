import * as express from 'express';
const router = express.Router();
const User = require('../schemas/models/postgres/User');
const Todo = require('../schemas/models/postgres/Todo');
router.get('/' ,  async (req, res) => {
    res.render('add', {
    })
});

router.post('/', async (req, res) => {
    const event = req.body;
    const userId = req.signedCookies.user_id;
    console.log(event);
    const {title, date, time, description, invitees, location} = event;
    if (!title || !time || !date || !description || title.trim().length == 0 || description.trim().length == 0) {
        return res.status(400).json({
            message: "Error please ensure all fields are filled",
            request: event,
        });
    };
    const inviteesArr = invitees.split(', ');
    const createdEvent = await Todo.create({
        title: title.trim(),
        description: description.trim(),
        date,
        time,
        location: location.trim(),
        invitees: inviteesArr,
        owner: userId,
        isCompleted: false,
    });
    return res.redirect('/home');

})

module.exports = router;