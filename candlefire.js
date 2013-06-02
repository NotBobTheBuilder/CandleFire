var express = require('express');
var app = express();

var cfm = {};
    cfm.root = require('./lib/root');
    cfm.talks = require('./lib/talks');
    cfm.get = require('./lib/getters');

app.get('/', cfm.root.get);

app.get('/rooms', cfm.get.getMany('room'), cfm.get.send);
app.get('/rooms/:roomId', cfm.get.getOne('room'), cfm.get.send);

app.get('/slots', cfm.get.getMany('slot'), cfm.get.send);
app.get('/slots/:slotId', cfm.get.getOne('slot'), cfm.get.send);

app.get('/talks', cfm.get.getMany('talk'), cfm.get.superimpose(["slot", "room"]), cfm.get.send);
app.get('/talks/:talkId', cfm.get.getOne('talk'), cfm.get.superimpose(["slot", "room"]), cfm.get.send);

app.listen(3000);
