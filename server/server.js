// @flow

var express = require('express');
var WebSocket = require('ws');

var app = express();
app.use(express.static(__dirname + "/../client"));

var clients = [];

var wss = new WebSocket.Server({ port: 3001 });
wss.on("connection", (connection) => {
  console.log("opened a connection");

  connection.username = connection.upgradeReq.url.substr(1);
  clients.push(connection);

  sendUsers();
  broadcast(connection.username + " joined the chat");

  connection.on("message", (message) => {
    console.log("message recieved: " + message);
    wss.clients.forEach((client) => {
      if (connection !== client && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  connection.on("close", () => {
    clients.splice(clients.indexOf(connection), 1);
    sendUsers();
    broadcast(connection.username + " left the chat");
    console.log("closed a connection");
  });

  connection.on("error", (error) => {
    console.error("error: " + error.message);
  });

  function broadcast(message) {
    wss.clients.forEach((client) => {
      var json = {"broadcast":message};
      client.send(JSON.stringify(json));
    })
  }

  function sendUsers() {
    wss.clients.forEach((client) => {
      var users = [];
      clients.forEach((user) => {
        users.push(user.username);
      });
      var json = {"users": users};
      client.send(JSON.stringify(json));
    });
  }

});

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
