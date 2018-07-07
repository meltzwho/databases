var db = require('../db').db;

module.exports = {
  messages: {
    get: function() {
      //db.query()
    }, // a function which produces all the messages
    post: function(data) {
      var userId,
        roomId;
      db.query('SELECT roomname FROM rooms WHERE roomname = ?', [data.roomname], (err, results) => {
        if (err) {
          throw Error('SCREAM')
        }
        if (results.length === 0) {
          db.query('insert into rooms(roomname) values(?)', [data.roomname], (err, res) => {
            if (err) {
              throw Error('SCREAM')
            }
            db.query('SELECT idUser FROM users WHERE username = ?', [data.username], (err, results) => {
              if (err) {
                throw Error('SCREAM')
              }
              userId = results[0].idUser;
              db.query('SELECT idRoom FROM rooms WHERE roomname = ?', [data.roomname], (err, results) => {
                if (err) {
                  throw Error('SCREAM')
                }
                roomId = results[0].idRoom;
                console.log('userId: ', userId);
                console.log('roomId: ', roomId);
                db.query(`insert into messages(text, idUser, idRoom) values(?,?,?) `, [data.message, userId, roomId],
                (err, result) => {
                  if (err) throw Error (err);
                });
              });
            });
          });
        }else{
          db.query('SELECT idUser FROM users WHERE username = ?', [data.username], (err, results) => {
            if (err) {
              throw Error('SCREAM')
            }
            userId = results[0].idUser;
            db.query('SELECT idRoom FROM rooms WHERE roomname = ?', [data.roomname], (err, results) => {
              if (err) {
                throw Error('SCREAM')
              }
              roomId = results[0].idRoom;
              console.log('userId: ', userId);
              console.log('roomId: ', roomId);
              db.query(`insert into messages(text, idUser, idRoom) values(?,?,?) `, [data.message, userId, roomId],
              (err, result) => {
                if (err) throw Error (err);
              });
            });
          });
        }
      });



      // a function which can be used to insert a message into the database
    }},

    users: {
      // Ditto as above.
      get: function() {},
      post: function(data) {
        db.query('SELECT username FROM users WHERE username = ?', [data.username], (err, results) => {
          if (err) {
            throw Error('SCREAM')
          }
          if (results.length === 0) {
            db.query('insert into users(username) values(?)', [data.username], (err, res) => {
              if (err) {
                throw Error('SCREAM')
              }
            });
          }
        });

      }
    }
};
