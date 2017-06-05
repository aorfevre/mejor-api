module.exports = function(app) {


    var spawn = require('child_process').spawn;

    var fs = require("fs");
    var publicIp = require('public-ip');


    var _checkEmpty = function(field) {
        if (field === undefined || field === "")
            return true

        return false;
    }

    app.post("/user", function(req, res) {


        var _req = req.body;
        console.log("Starting /user of " + _req.email)

        //basic controls on mandatory fields: email/user/birthdate/country_code/country_name,plan,plan_value
        if (_checkEmpty(_req.email) || _checkEmpty(_req.user) || _checkEmpty(_req.password) || _checkEmpty(_req.birthdate) ||
            _checkEmpty(_req.country_code) || _checkEmpty(_req.country_name) || _checkEmpty(_req.plan) ||
            _checkEmpty(_req.plan_value)) {
            res.status(400).send({
                error: "Please fill all fields from the form"
            });
        } else {
            publicIp.v4().then(ip => {





                var _collection = db.collection('users');
                var check = _collection.find({
                    email: _req.email
                }, {
                    $exists: true
                }).toArray(function(err, docs) {
                    if (docs.length === 0) {

                        //preparing datas for post to mongoDb
                        var _newUser = {
                            ip: ip,
                            datac: new Date(), //creation timestamp
                            email: _req.email,
                            password: _req.password,
                            user: _req.user,
                            birthdate: _req.birthdate,
                            country_code: _req.country_code,
                            country_name: _req.country_name,
                            plan: _req.plan,
                            plan_value: _req.plan_value,
                            plan_currency: _req.plan_currency
                        }

                        //post to mongdeb
                        _collection.insertOne(_newUser, function(err, result) {

                            console.log(_newUser)
                            if(err === null){
                                res.status(201).send("POST user done");
                            }else{
                                res.status(300).send("Error while posting datas; try again later");
                            }
                            
                        });
                    } else {
                        //email already exists; we shall send err message
                        console.log("Email already exists - no data inserted")
                        //code 409 is for conflict
                        res.status(409).send("Email already exists");
                    }



                });






            });
        }


    });


//TODO : totest
    app.get("/user/:email", function(req, res) {

                var _collection = db.collection('users');
                var check = _collection.find({
                    email: req.params.email
                }).toArray(function(err, docs) {


                    if(docs.length === 1){
                        //for security purpose; we remove password from response
                        // so it will not transit with the HTTP request
                        delete docs[0].password;
                        res.status(200).send(docs[0]);
                    }else {
                        res.status(204).send("No data founded for this email")
                    }

                });
      

        
    });






}