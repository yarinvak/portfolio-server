var express = require('express');
var router = express.Router();
var Case = require('../models/case');

router.get('/', function (req, res, next) {
    Case.find(function (err, users) {
        if (err) {
            res.sendStatus(500);
        }
        else res.send(users);
    });
});

router.post('/addCase', function (req, res) {
    let casey = req.body.case;
    assertNotExists(casey).then(function () {
        new Case(casey).save(function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else res.sendStatus(200);
        });
    }).catch(function(err){
        res.status(500).send(err);
    });
});

function assertNotExists(casey) {
    return new Promise(function (resolve, reject) {
        Case.find({patientInfo: {id_number: casey.patientInfo.id_number}}, function (err, cases) {
            if (cases.length > 0)
                reject("patient already exists");
            else
                resolve();
        });
    });
}

module.exports = router;
