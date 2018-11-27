const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db');
const { WSS } = require('../index');

router.get('/', getTimers);
router.get('/:id', getTimer);
router.delete('/:id', deleteTimer);
router.delete('/', deleteAllTimers);
router.post('', addTimer);
router.patch('/:id', updateTimer);

function getTimers(request, response) {
  const timers = db.db.get('timers').value();
  response.send(timers);
}

function getTimer(req, res) {
  const { id } = req.params;
  const timer = db.getTimerById(req.params.id);
  if (timer) {
    res.send(timer);
  } else {
    res.sendStatus(404);
  }
}

function updateTimer(req, res) {
  const { id } = req.params;
  const { timer } = req.body;
  if (timer && !timer.title) {
    res.sendStatus(404);
  } else {
    if (db.getTimerById(id)) {
      db.updateTimer(timer);
      res.sendStatus(200);
      WSS.triggerClientsToUpdateData();
    }
    res.sendStatus(404);
  }
}

function addTimer(request, response) {
  const { title, minutes, seconds } = request.body;

  if (!title || !minutes || !seconds) {
    response.sendStatus(400);
  } else {
    const timer = { title, minutes, seconds };
    db.addTimer(timer);
    response.sendStatus(200);
    WSS.triggerClientsToUpdateData();
  }
}

function deleteTimer(request, response) {
  const { id } = request.params;
  console.log(request.params);
  if (!id) {
    response.sendStatus(400);
  } else if (id) {
    db.deleteTimer(id);
    response.sendStatus(200);
    WSS.triggerClientsToUpdateData();
  }
}

function deleteAllTimers(req, res) {
  db.deleteAllTimers();
  res.sendStatus(200);
  WSS.triggerClientsToUpdateData();
}

function deleteTimerById(request, response) {
  const { id } = request.params;
  if (!id) {
    response.sendStatus(400);
  } else {
    db.deleteTimer({ id });
    response.sendStatus(200);
    WSS.triggerClientsToUpdateData();
  }
}

module.exports = router;
