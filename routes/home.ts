import * as express from 'express';
const router = express.Router();
const User = require('../schemas/models/postgres/User');

router.get('/', async (req, res) => {
    const user = await User.findOne({
        where: {
            firstName: "Paavan"
        }
    });
    const hourOfDay = new Date().getHours();
    let greeting = hourOfDay < 12 ? "Good morning" : ( hourOfDay < 5 ? "Good afternoon" : "Good evening");
    res.render('home', {
        user,
        greeting,
    })
});

// router.

module.exports = router;