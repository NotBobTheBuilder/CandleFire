var express   = require('express'),
    app       = express(),
    async     = require('async'),
    models    = require('./models');

app.use(express.bodyParser());
models = models(app);
app.listen(3000);
