var monk = require('monk');
var async = require('async');

var db = monk('localhost:27017/cfm');

exports.get = function (req, res) {
    var superimpose = function (coll, key, elem, cb) {
        db.get(coll).findById(elem[key], function (err, doc) {
            elem[key] = doc;
            cb(elem);
        });
    };
    db.get('talks')
    .find({}, function(err, doc) {
        async.map(doc, function (elem, cb) {
            superimpose("rooms", "room", elem, function (elem) {
                superimpose("slots", "slot", elem, function (elem) {
                    res.json(elem);
                })
            });
        });
    });
};
