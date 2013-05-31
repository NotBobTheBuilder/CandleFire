var mongo = require('mongodb');
var monk = require('monk');

var db = monk('localhost:27017/cfm');

exports.get = function (req, res) {
    if (!req.params.roomid) {
        db.get('rooms')
        .find({}, function(err, doc) {
            res.json(doc);
        });
    } else {
        db.get('rooms')
        .findById(parseInt(req.params.roomId), function(err, doc) {
            res.json(doc);
        });
    }
};
