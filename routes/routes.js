module.exports = function(app) {


    var spawn = require('child_process').spawn;

    var fs = require("fs");
    var publicIp = require('public-ip');
    var cors = require('cors');


    var _checkEmpty = function(field) {
        if (field === undefined || field === "")
            return true

        return false;
    }

    var checkIfOption = function(req, res, next) {
      

        if (req.method === 'OPTIONS') {

            var headers = {};
            // IE8 does not allow domains to be specified, just the *
            // headers["Access-Control-Allow-Origin"] = req.headers.origin;
            headers["Access-Control-Allow-Origin"] = "http://localhost:8080";
            headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = false;
            headers["Access-Control-Max-Age"] = '86400'; // 24 hours
            headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
            res.writeHead(200, headers);
            res.end();
        } else {
            next()
        }
    }

    app.use(cors({origin: 'http://localhost:8080'}));

    app.all('*', function(req, res, next) {

        //Xorigin Post shall define OPTIONS first on every request
        checkIfOption(req, res, next);
    });

}