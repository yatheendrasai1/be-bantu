const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const workLoggerSchema = new mongoose.Schema({
    log: { type: mongoose.Schema.Types.Mixed, required: false },
    createdOn : {
        type : Date
    }
});

const WorkLogger = mongoose.model('worklogger', workLoggerSchema);

module.exports = WorkLogger;