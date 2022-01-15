const express = require('express');
const plannercontroller = require('../controllers/plannercontroller');
const authenticateToken = require('../auth/authtoken');

const router = express.Router();
router.use(authenticateToken);

router.get('/list', plannercontroller.getList);

module.exports = router;