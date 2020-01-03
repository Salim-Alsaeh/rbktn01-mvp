const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET 'api/contacts'
// @desc    Get contacts for a specific user
// @access  Private

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts)
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error')
    }
});

// @route  POST 'api/contacts'
// @desc    create a new contact
// @access  Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]],async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, phone, type} = req.body;

    try {

        const newContact = new Contact({
           name,
           email,
           phone,
           type,
           user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error')
    }

});

// @route  PUT 'api/contacts:id'
// @desc    update a contact
// @access  Private
router.put('/:id', (req, res) => {
    res.send('update a contact')
});

// @route  POST 'api/contacts'
// @desc    delete a contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('delete a contact')
});

module.exports = router;
