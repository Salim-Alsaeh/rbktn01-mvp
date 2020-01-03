const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET 'api/auth'
// @desc    Get logged in authorized user
// @access  Private

router.get('/', auth, async (req, res) => {

    try {
        let user = await User.findById(req.user.id).select('-password'); //doesn't return the password
        res.json(user);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server error')
    }

});

// @route  POST 'api/auth'
// @desc    Auth User and get token
// @access  Public

router.post('/',[
    check('email','Please input a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (!user){
            return res.status(400).json({msg: 'invalid Credentials'})
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: 'invalid Credentials'})
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({token})
        })

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;
