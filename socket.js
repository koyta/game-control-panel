const WebSocket = require('ws');
const DB = require('./db');

class WebsocketServer {
  constructor(port) {
    this.server = new WebSocket.Server({ port });
  }

  triggerClientsToUpdateData() {
    this.server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(
          { type: 'data', value: JSON.stringify(DB.getAllTimers()) }));
      }
    });
  }

  startTimerCountdown() {
    console.log('========= COUNTDOWN ===========');
    this.server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'start', value: '' }));
      }
    });
  }
}

module.exports = WebsocketServer;
