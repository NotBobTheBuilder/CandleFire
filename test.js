var app     = require('./index'),
    request = require('supertest')(app);

request
  .post('/users')
  .send({'name': 'Jack'})
  .expect(201)
  .end(function(err, res) {
    if (err) throw err;
    var body = res.body;
    if (!body) throw 'No body!';
    request
      .get('/users/' + body.id)
      .expect(200, body)
      .end(function(err, res) {
        if (err) throw err;
        console.log('Done: ', res.body);
      });
  });
