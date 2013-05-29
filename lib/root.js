var mongo = require('mongodb');
var monk = require('monk');

var db = monk('localhost:27017/cfm');

exports.isAdmin = function (req, res) {
    res.send(403, "Unauthorised");
}

exports.get = function (req, res) {
    db.get('config')
    .findById(1, function(err, doc) {
        delete doc._id;
        if (!doc.configured) {
            doc.configured = false;
        }
        res.json(doc);
    });
};

exports.post = function (req, res) {

};
