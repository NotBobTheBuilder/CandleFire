var Bookshelf = require('bookshelf');

module.exports = function(config) {
  config = config || {
    "client": "sqlite3",
    "connection": {
      "filename": "./cfm.db"
    },
    "debug": true
  };
  
  return Bookshelf.initialize(config);
}
