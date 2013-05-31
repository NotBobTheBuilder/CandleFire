var express = require('express');
var cfm = {};
    cfm.root = require('./lib/root');
    cfm.rooms = require('./lib/rooms');
    cfm.slots = require('./lib/slots');

var app = express();

app.get('/', cfm.root.get);

app.get('/rooms', cfm.rooms.get);
app.get('/rooms/:roomId', cfm.rooms.get);

app.get('/slots', cfm.slots.get);
app.get('/slots/:slotId', cfm.slots.get);

app.listen(3000);
