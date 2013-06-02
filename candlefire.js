var express = require('express');
var cfm = {};
    cfm.root = require('./lib/root');
    cfm.talks = require('./lib/talks');
    cfm.getters = require('./lib/getters');

var app = express();

app.get('/', cfm.root.get);

app.get('/rooms', cfm.getters.getMany('room'));
app.get('/rooms/:roomId', cfm.getters.getOne('room'));

app.get('/slots', cfm.getters.getMany('slot'));
app.get('/slots/:slotId', cfm.getters.getOne('slot'));

app.get('/talks', cfm.talks.getMany);
app.get('/talks/:talkId', cfm.talks.getOne);

app.listen(3000);
