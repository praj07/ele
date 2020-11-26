import * as express from 'express';
const router = express.Router();
const User = require('../schemas/models/postgres/User');

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.render('home', {
        users,
    })
});

// router.

module.exports = router;