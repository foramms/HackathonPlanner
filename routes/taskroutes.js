const express = require('express');
const taskController = require('../controllers/taskcontroller');
const authenticateToken = require('../auth/authtoken');

const router = express.Router();
router.use(authenticateToken);

router.get('/list', taskController.getList);

module.exports = router;