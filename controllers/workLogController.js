const workLog = require('../models/workLogModel');


const getWorkLogs = async (req, res) => {
    try {
        const logs = await workLog.find({});
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorkLogs = async (req, res) => {
    try {
        let log = req?.body?.log;
        if(log?.sT || log?.eT || log?.text){
            let logObject = {
                log:log,
                createdOn : new Date()
            }
            const logs = await workLog.create(logObject);
            res.sendStatus(200);
        }
        else{
            res.sendStatus(500);
        }
    }
    catch(error){
        console.log("%% ~ createWorkLogs ~ error:", error)
    }
}

module.exports = {
    getWorkLogs,
    createWorkLogs
};