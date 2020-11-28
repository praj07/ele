import * as express from 'express';
const router = express.Router();
const User = require('../schemas/models/postgres/User');

router.get('/' ,  async (req, res) => {


    res.render('add', {
    })
})

module.exports = router;