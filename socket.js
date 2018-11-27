const WebSocket = require('ws');
const DB = require('./db');

class WebsocketServer {
  constructor(port) {
    this.server = new WebSocket.Server({ port });
    this.server.addListener('connection', function connection(socket) {
      socket.send('Connected succesfully');

      socket.on('message', function incoming(message) {
        switch(message) {
          
        }
      });
    });
  }

  triggerClientsToUpdateData() {
    this.server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(DB.getAllTimers());
      }
    });
  }
}

module.exports = WebsocketServer;
