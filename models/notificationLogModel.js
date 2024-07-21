const mongoose = require('mongoose');

const notificationLogSchema = new mongoose.Schema({
    log: { type: mongoose.Schema.Types.Mixed, required: false },
});

const NotificationLog = mongoose.model('notificationlog', notificationLogSchema);

module.exports = NotificationLog;