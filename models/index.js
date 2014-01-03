module.exports = function(app) {
  var db = require('./db')(),
      Talk, Talks,
      User, Users,
      Room, Rooms,
      Slot, Slots;

  User = db.Model.extend({
    "tableName": "users",
    "fields": ["id", "name", "talks"],

    "talks": function() {
      return this.belongsToMany(Talk);
    },
  });

  Users = db.Collection.extend({
    model: User,
  });

  app.get("/users", function(req, res) {
    Users.forge().fetch({
      "withRelated": ["talks"]
    }).exec(function(err, users) {
      res.json(users.toJSON());
    });
  });

  app.get("/users/:id", function(req, res) {
    User.forge({id: req.params.id}).fetch({
      "withRelated": ["talks"]
    }).then(function(user) {
      res.json(user.toJSON());
    });
  });

  app.post("/users", function(req, res) {
    User.forge(req.body).save().then(function(user) {
      user.fetch({
        "withRelated": ["talks"]
      }).then(function(user) {
        res.location('/users/' + user.id);
        res.json(201, user.toJSON());
      });
    });
  });

  Slot = db.Model.extend({
    "tableName": "slots",
    "fields": ["id", "start", "end"],

    "talks": function() {
      return this.belongsToMany(Talk);
    },
  });

  Slots = db.Collection.extend({
    model: Slot,
  });

  app.get("/slots", function(req, res) {
    Slots.forge().fetch({
      "withRelated": ["talks"]
    }).then(function(slots) {
      res.json(slots.toJSON());
    });
  });

  app.get("/slots/:id", function(req, res) {
    Slot.forge({id: req.params.id}).fetch({
      "withRelated": ["talks"]
    }).then(function(slot) {
      res.json(slot.toJSON());
    });
  });

  app.post("/slots", function(req, res) {
    Slot.forge(req.body).save().then(function(slot) {
      res.location('/slots/' + slot.id);
      res.json(201, slot.toJSON());
    });
  });

  Room = db.Model.extend({
    "tableName": "rooms",
    "fields": ["id", "name", "facilities"],

    "talks": function() {
      return this.hasMany(Talk, "room");
    },
  });

  Rooms = db.Collection.extend({
    model: Room,
  });

  app.get("/rooms", function(req, res) {
    Rooms.forge().fetch({
      "withRelated": ["talks"]
    }).then(function(rooms) {
      res.json(rooms.toJSON());
    });
  });

  app.get("/rooms/:id", function(req, res) {
    Room.forge({id: req.params.id}).fetch({
      "withRelated": ["talks"]
    }).then(function(room) {
      res.json(room.toJSON());
    });
  });

  app.post("/rooms", function(req, res) {
    Room.forge(req.body).save().exec(function(err, room) {
      if (err)
        console.log("err: ", err);
      res.location('/rooms/' + room.id);
      res.json(201, room.toJSON());
    });
  });

  Talk = db.Model.extend({
    "tableName": "talks",
    "fields": ["id", "title", "description", "creator", "speakers", "room", "slots"],
    
    "creator": function() {
      return this.belongsTo(User, "creator");
    },

    "speakers": function() {
      return this.belongsToMany(User);
    },

    "room": function() {
      return this.belongsTo(Room, "room");
    },

    "slots": function() {
      return this.belongsToMany(Slot);
    },
  });

  Talks = db.Collection.extend({
    model: Talk,
  });

  app.get("/talks", function(req, res) {
    Talks.forge().fetch({
      "withRelated": ["creator", "speakers", "room", "slots"]
    }).then(function(talks) {
      res.json(talks.toJSON());
    });
  });

  app.get("/talks/:id", function(req, res) {
    Talk.forge({id: req.params.id}).fetch({
      "withRelated": ["creator", "speakers", "room", "slots"]
    }).then(function(talk) {
      res.json(talk.toJSON());
    });
  });

  app.post("/talks", function(req, res) {
    talk = req.body;

    var speakers = talk.speakers;
    var slots    = talk.slots;
    delete talk.speakers;
    delete talk.slots;

    Talk.forge(talk).save().exec(function(err, talk) {
      talk.speakers().attach(speakers).exec(function(err, speakers) {
        talk.slots().attach(slots).exec(function(err, slots) {
          res.location('/talks/' + talk.id);
          res.json(201, talk.toJSON());
        });
      });
    });
  });

};
