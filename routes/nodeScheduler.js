module.exports = function(app) {

    var schedule = require('node-schedule');
    var _OLDERTHAN = 1000 * 60 * 60 * 72;
    
    var j = schedule.scheduleJob({
        hour: 3,
        minute: 0,
        second: 0
    }, function() {

        db.collection('users').remove({
            datac: {
                $lt: new Date((new Date()) - _OLDERTHAN)
            }
        }, function(err, obj) {
            if (err) {
                console.log(err);
                throw err;
            }
            if (obj.result.n !== 0)
                console.log(obj.result.n + " document has been removed as it's older than 72h")
        });

    });

}