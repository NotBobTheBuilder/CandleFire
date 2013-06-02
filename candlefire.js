var express = require('express');
var app = express();

var cfm = {};
    cfm.root = require('./lib/root');
    cfm.talks = require('./lib/talks');
    cfm.getters = require('./lib/getters');

app.get('/', cfm.root.get);

app.get('/rooms', cfm.getters.getMany('room'), cfm.getters.send);
app.get('/rooms/:roomId', cfm.getters.getOne('room'), cfm.getters.send);

app.get('/slots', cfm.getters.getMany('slot'), cfm.getters.send);
app.get('/slots/:slotId', cfm.getters.getOne('slot'), cfm.getters.send);

app.get('/talks', cfm.getters.getMany('talk'), cfm.getters.superimpose(["slot", "room"]), cfm.getters.send);
app.get('/talks/:talkId', cfm.getters.getOne('talk'), cfm.getters.superimpose(["slot", "room"]), cfm.getters.send);

app.listen(3000);
