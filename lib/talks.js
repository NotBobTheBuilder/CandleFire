var monk = require('monk');
var async = require('async');

var db = monk('localhost:27017/cfm');

exports.get = function (req, res) {
    db.get('talks')
    .find({}, function(err, doc) {
        async.map(doc, function (elem, cb) {
            db.get('rooms')
            .findById(elem.room)
            .on('success', function (doc) {
                elem.room = doc;
                db.get('slots')
                .findById(elem.slot)
                .on('success', function (doc) {
                    elem.slot = doc;
                    cb(null, elem);            
                });
            });

            }, function (error, result) {
            res.json(result);
            })
/*        var talks = doc.map(function(e) {
            db.get('rooms')
            .findById(e.room)
            .on('success', function(doc) {
                console.log(doc);
            });

            db.get('slots')
            .findById(e.slot)
            .on('success', function(doc) {
                e.slot = doc;
            });

            return e;
        });
*/
    });
};
