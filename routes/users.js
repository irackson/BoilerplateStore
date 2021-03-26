const express = require('express');
const router = express.Router();
const { newUser } = require('../controllers/users');

router.get('/new', newUser);

module.exports = router;
