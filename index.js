// Server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const WebsocketServer = require('./socket');

const app = express();
const WSS = new WebsocketServer(5001);
module.exports.WSS = WSS;

/**
 * Express API routes
 */
const TimersRouter = require('./routes/TimersRouter');

/**
 * Express app middleware and settings
 */
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

app.use('/api/timers', TimersRouter);

app.use(express.static(path.resolve('client', 'dist')));

/**
 * Creating an express server in localhost
 */
const server = app.listen(5000, () => {
  console.log(`http://localhost:${server.address().port}`);
});
