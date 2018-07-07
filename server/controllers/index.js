var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      //handle http
      //console.log('messages request body', req.body);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //console.log('messages request body', req.body);
      models.users.post(req.body);
      models.messages.post(req.body);
      res.send('11');


    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      //console.log('users request body', req.body);
      res.send();
    },
    post: function (req, res) {
      models.users.post(req.body);
      //console.log('users request body', req.body);
      res.send();

    }
  }
};
