const express = require('express');
const router = express.Router();

// @route   GET 'api/contacts'
// @desc    Get contacts for a specific user
// @access  Private
router.get('/', (req, res) => {
    res.send('get user contacts')
});

// @route  POST 'api/contacts'
// @desc    create a new contact
// @access  Private
router.post('/', (req, res) => {
    res.send('Create a new a contact')
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
