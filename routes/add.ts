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
    const {title, deadline, description, invitees} = event;
    console.log(event)
    if (!title || !deadline || !description || title.trim().length == 0 || description.trim().length == 0) {
        return res.status(400).json({
            message: "Error please ensure all fields are filled"
        });
    };
    const inviteesArr = invitees.split(', ');
    const createdEvent = await Todo.create({
        title: title.trim(),
        description: description.trim(),
        deadline,
        invitees: inviteesArr,
        owner: userId,
        isCompleted: false,
    });
    return res.redirect('/home');

})

module.exports = router;