_ = require('underscore'),
  express = require('express.io'),
  app = express().http().io(),
  players = [];

app.use(express.static(__dirname + '/static'));

app.io.sockets.on('connection', function (socket) {
  var ua = socket.handshake.headers['user-agent'];

  if (!/mobile/i.test(ua)) {
    console.log('connection data?');
    socket.emit('connection data', {
      players: players
    });
    return;
  }

  console.log(socket.id + ' connected');

  players.push({
    id: socket.id
  });

  console.log(players);

  app.io.broadcast('player connected', {
    id: socket.id
  });

  socket.on('deviceorientation', function (data) {
    app.io.broadcast('deviceorientation', {
      id: socket.id,
      event: data
    });
  });

  socket.on('disconnect', function () {
    console.log(socket.id + ' disconnected');
    players = _.without(players, _.findWhere(players, {id: socket.id}));
    app.io.broadcast('player disconnected', {
      id: socket.id
    });
  });
});

// Send the client html.
app.get('/', function(req, res) {
  var ua = req.header('user-agent');

  if (/mobile/i.test(ua)) {
    res.sendfile(__dirname + '/static/mobile.html');
  } else {
    res.sendfile(__dirname + '/static/desktop.html');
  }
});

app.listen(7076);