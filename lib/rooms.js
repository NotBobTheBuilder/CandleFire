var monk = require('monk');

var db = monk('localhost:27017/cfm');

exports.getMany = function (req, res) {
    db.get('rooms')
    .find({}, function(err, doc) {
        res.json(doc);
    });
};

exports.getOne = function(req, res) {
    db.get('rooms')
    .findById(parseInt(req.params.roomId), function(err, doc) {
        res.json(doc);
    });
};
