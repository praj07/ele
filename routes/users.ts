import * as express from 'express';
const router = express.Router();
const User = require('../schemas/models/postgres/User');

router.get('/', async(req, res) => {
    // res.send('USER DATAS')

    const users = await User.findAll();
    res.render('gigs', {
        users,
    })
});

// router.

module.exports = router;