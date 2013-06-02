var express = require('express');
var cfm = {};
    cfm.root = require('./lib/root');
    cfm.rooms = require('./lib/rooms');
    cfm.slots = require('./lib/slots');
    cfm.talks = require('./lib/talks');

var app = express();

app.get('/', cfm.root.get);

app.get('/rooms', cfm.rooms.getMany);
app.get('/rooms/:roomId', cfm.rooms.getOne);

app.get('/slots', cfm.slots.getMany);
app.get('/slots/:slotId', cfm.slots.getOne);

app.get('/talks', cfm.talks.getMany);
app.get('/talks/:talkId', cfm.talks.getOne);

app.listen(3000);
