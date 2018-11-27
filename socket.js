const WebSocket = require('ws');
const DB = require('./db');

class WebsocketServer {
  constructor(port) {
    this.server = new WebSocket.Server({ port });
    this.server.on('connection', function connection(socket) {
      socket.send('Connected succesfully');
    });
  }

  triggerClientsToUpdateData() {
    this.server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(DB.getAllTimers()));
      }
    });
  }
}

module.exports = WebsocketServer;
