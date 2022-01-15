const express = require('express');
const userconroller = require('../controllers/userconroller');

const router = express.Router();

router.post('/signin', userconroller.signin);
router.post('/login', userconroller.login);

module.exports = router;