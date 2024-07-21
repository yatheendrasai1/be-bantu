const NotificationLog = require('../models/notificationLogModel');


const getNotificationLogs = async (req, res) => {
    try {
        const logs = await NotificationLog.find({});
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createNotificationLogs = async (req, res) => {
    try {
        let {title, text} = req?.body?.log;
        if(title || text){
            let logObject = {
                log:{
                    title, text,
                    createdOn : new Date()
                }
            }
            const logs = await NotificationLog.create(logObject);
            res.sendStatus(200);
        }
        else{
            res.sendStatus(500);
        }
    }
    catch(error){
        console.log("%% ~ createNotificationLogs ~ error:", error)
    }
}

module.exports = {
    getNotificationLogs,
    createNotificationLogs
};