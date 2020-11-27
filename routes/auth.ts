
import * as express from 'express';
const router = express.Router();
const User = require('../schemas/models/postgres/User');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(7);

router.get('/', (req, res) => {
    res.json({
        message: "locked"
    })
});

function validUser (user : any) {
    const validEmail = typeof user.email == 'string' &&
                        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' &&
                        user.password.trim() != '' &&
                        user.password.trim().length >= 6;
    return validEmail && validPassword;
}

router.post('/signup', async (req, res) => {
    let valid : boolean;
    const user = req.body;
    try {
        valid = validUser(req.body)
    } catch (e) {
        return res.status(400).json({
            message: 'Error please ensure proper parameters'
        })
    }
    if (valid) {
        const { firstName, lastName, email, password, dob } = user; 
        if (!firstName || !lastName || firstName.trim().length == 0 || lastName.trim().length == 0) {
            return res.status(400).json({
                messsage: "Error please make sure you provide your first and last name please"
            })
        };
        const userToCheck = await User.findOne({
            where : {
                email
            }
        });
        let createdUser;
        if (!userToCheck) { // user not found
            // unique email
            const encryptedPass = bcrypt.hashSync(password, salt);
            createdUser = await User.create({
                firstName,
                lastName,
                email,
                dob,
                password : encryptedPass
            })
        } else {
            // email in use
            return res.status(400).json({
                message: 'Error please use a unique email'
            })
        }
        return res.json ({
            id: createdUser.id,
            message: 'cool'
        })
    } else {
        res.status(400).json({
            message: 'Error please ensure proper parameters'
        })
    };
})

router.post('/login', async (req, res) => {
    let valid : boolean;
    const user = req.body;
    try {
        valid = validUser(req.body)
    } catch (e) {
        return res.status(400).json({
            message: 'Error please ensure proper parameters'
        })
    }
    if (valid) {
        const { email, password } = user; 
        const userToCheck = await User.findOne({
            where : {
                email
            }
        });
        if (userToCheck) {
            const result = await bcrypt.compare(password, userToCheck.password);
            if (result) {
               // passwords match 
               const isSecured = req.app.get('env') != 'development'; 
                res.cookie('user_id', userToCheck.id, {
                   httpOnly: true,
                   signed: true,
                   secure: isSecured
                });
            } else {
                return res.status(400).json({
                    message: "Incorrect email and password"
                });
            }
            res.json({
                message: "Logged in"
            })
        } else {
            return res.status(400).json({
                message: "Email doesn't exist"
            });
        }
    } else {
        res.status(400).json({
            message: "Invalid email and password"
        })
    }
})
module.exports = router;