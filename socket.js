const WebSocket = require('ws');

class WebsocketServer {
  constructor(port) {
    this.server = new WebSocket.Server({ port });
    this.server.on('connection', socket => {
      socket.onmessage = message => {
        console.log(`Message: ${message.data}`);
      };
      socket.send(JSON.stringify({hello: 'brother'}))
    });

    this.server.on('close', listener => {
      console.log(`Connection closed: ${listener}`);
    });
    this.server.on('message', message => {
      
    })
  }
}

module.exports = WebsocketServer;
