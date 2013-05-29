var mongo = require('mongodb');
var monk = require('monk');

var db = monk('localhost:27017/cfm');

exports.get = function (req, res) {
    if (!req.params.slotid) {
        db.get('slots')
        .find({}, function(err, doc) {
            res.json(doc);
        });
    } else {
        db.get('slots')
        .findById(parseInt(req.params.slotid), function (err, doc) {
            res.json(doc);
        });
    }
};

