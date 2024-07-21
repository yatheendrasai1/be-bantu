const express = require('express');
const { getNotificationLogs, createNotificationLogs } = require('../controllers/notificationLogController');

const router = express.Router();

router.get('/notificationlogs', getNotificationLogs);

router.post('/notificationlogs', createNotificationLogs);


module.exports = router;