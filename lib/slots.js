var monk = require('monk');

var db = monk('localhost:27017/cfm');

exports.getMany = function (req, res) {
    db.get('slots')
    .find({}, function(err, doc) {
        res.json(doc);
    });
};

exports.getOne = function(req, res) {
    db.get('slots')
    .findById(parseInt(req.params.slotId), function(err, doc) {
        res.json(doc);
    });
};
