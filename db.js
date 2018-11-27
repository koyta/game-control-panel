const low = require('lowdb');
const shortId = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');

const db = low(adapter);

const timersDb = db.get('timers');

module.exports.addTimer = timer => {
  const newTimer = {
    id: shortId.generate(),
    title: timer.title,
    minutes: timer.minutes,
    seconds: timer.seconds,
  };

  timersDb.push(newTimer).write();
};

module.exports.getTimerById = id => {
  return timersDb.find({ id }).value();
};

module.exports.deleteTimer = timerId => {
  timersDb.remove({ id: timerId }).write();
};

module.exports.deleteAllTimers = () => {
  db.set('timers', []).write();
};

module.exports.updateTimer = (id, updatedTimer) => {
  return timersDb
    .find({ id })
    .assign({ ...updatedTimer })
    .value();
};

module.exports.db = db;
