const express = require('express');
const { getWorkLogs, createWorkLogs } = require('../controllers/workLogController.js');

const router = express.Router();

router.get('/worklogs', getWorkLogs);

router.post('/worklogs', createWorkLogs);


module.exports = router;