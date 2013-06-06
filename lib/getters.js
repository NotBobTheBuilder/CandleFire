"use strict";
var async = require('async');
var monk = require('monk');
var db = monk('localhost:27017/cfm');

exports.getMany = function (field) {
    return function (req, res, next) {
        db.get(field + 's')
            .find({}, function (err, doc) {
                req.doc = doc;
                next();
            });
    };
};

exports.getOne = function (field) {
    return function (req, res, next) {
        db.get(field + 's')
            .findById(parseInt(req.params[field + 'Id'], 10), function (err, doc) {
                req.doc = doc;
                next();
            });
    };
};

exports.superimpose = function (keys) {
    return keys.map(function (key) {
        return function (req, res, next) {
            var deepen, callback;
            deepen = function (obj, cb) {
                db.get(key + 's').findById(obj[key], function (err, doc) {
                    obj[key] = doc;
                    cb(null, obj);
                });
            };
            callback = function (err, res) {
                req.doc = res;
                next();
            };
            if (!!req.doc.map) {
                async.map(req.doc, deepen, callback);
            } else {
                deepen(req.doc, callback);
            }
        };
    });
};

exports.send = function (req, res) {
    res.json(req.doc);
};
