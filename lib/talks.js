"use strict";
var monk = require('monk');
var async = require('async');

var db = monk('localhost:27017/cfm');

var superimpose = function (coll, key, elem, cb) {
    db.get(coll).findById(elem[key], function (err, doc) {
        elem[key] = doc;
        cb(elem);
    });
};

exports.getMany = function (req, res) {
    db.get('talks')
        .find({}, function (err, doc) {
            async.map(doc, function (elem, cb) {
                superimpose("rooms", "room", elem, function (elem) {
                    superimpose("slots", "slot", elem, function (elem) {
                        cb(null, elem);
                    });
                });
            }, function (err, results) {
                res.json(results);
            });
        });
};

exports.getOne = function (req, res) {
    db.get('talks')
        .findById(parseInt(req.params.talkId, 10), function (err, doc) {
            superimpose("rooms", "room", doc, function (elem) {
                superimpose("slots", "slot", elem, function (elem) {
                    res.json(elem);
                });
            });
        });
};
