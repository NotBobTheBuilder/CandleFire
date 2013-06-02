var monk = require('monk');
var db = monk('localhost:27017/cfm');

exports.getMany = function(field) {
    return function (req, res) {
        db.get(field+'s')
        .find({}, function(err, doc) {
            res.json(doc);
        });
    };
};

exports.getOne = function (field) {
    return function(req, res) {
        db.get(field+'s')
        .findById(parseInt(req.params[field+'Id']), function(err, doc) {
            res.json(doc);
        });
    };
};
