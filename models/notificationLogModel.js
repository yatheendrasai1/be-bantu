const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const notificationLogSchema = new mongoose.Schema({
    log: { type: mongoose.Schema.Types.Mixed, required: false },
});

const NotificationLog = mongoose.model('notificationlog', notificationLogSchema);

module.exports = NotificationLog;