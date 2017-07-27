var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            res.sendStatus(500);
        }
        else res.send(users);
    });
});

router.post('/login', function(req,res){
   let email = req.body.email;
   let password = req.body.password;
    User.find({email: email, password: password}, function (err, users) {
        if (users.length > 0)
            res.sendStatus(200);
        else
            res.status(403).send("login information invalid");
    });
});

router.post('/addUser', function (req, res) {
    let user = req.body.user;
    // var user = {
    //     privateName: req.body.privateName,
    //     surName: req.body.surName,
    //     age: req.body.age,
    //     address: req.body.address,
    //     description: req.body.description,
    //     avatar: req.body.avatar,
    //     email: req.body.email,
    //     password: req.body.password
    // };
    assertNotExists(user).then(function(){
        validateEmail(user.email).then(function(){
            new User(user).save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else res.sendStatus(200);
            });
        }).catch(function(err){
            res.status(500).send(err);
        })
    }).catch(function(err){
        res.status(500).send(err);
    });
});

function assertNotExists(user) {
    return new Promise(function (resolve, reject) {
        User.find({email: user.email}, function (err, users) {
            if (users.length > 0)
                reject("user already exists");
            else
                resolve();
        });
    });
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return new Promise(function(success,reject){
       if (re.test)
           success();
       else
           reject("email is invalid");
    });
}


module.exports = router;
