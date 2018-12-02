import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

class API {
  constructor() {
    this._instance = Instance;
  }

  getInstance = () => () => this._instance;

  getTimers = () => {
    return this._instance.get('/timers');
  };

  getTimer = id => {
    return this._instance.get(`/timers/${id}`, {
      params: {
        id,
      },
    });
  };

  /**
   *
   * @param title
   * @param minutes
   * @param seconds
   * @returns {AxiosPromise<any>}
   */
  addTimer = ({ title, minutes, seconds }) => {
    return this._instance.post(`/timers`, {
      title,
      minutes,
      seconds,
    });
  };

  /**
   * Removes timer from db
   * @param id Unique ID of timer
   */
  deleteTimer = id => {
    return this._instance.delete(`/timers/${id}`);
  };

  /**
   * Removes all the timers in DB a.k.a reset to initial app state
   * @returns {AxiosPromise}
   */
  clearTimers = () => {
    return this._instance.delete(`/timers`);
  };

  /**
   * Updates timer :)
   * @param id Unique timer.id
   * @param title {string} Timer title
   * @param minutes {number} Timers minutes
   * @param seconds {number} Timer seconds
   * @returns {AxiosPromise<any>}
   */
  updateTimer = (id, { title, minutes, seconds }) => {
    return this._instance.patch(`/timers/${id}`, {
      title,
      minutes,
      seconds,
    });
  };

  startTimer = () => {
    return this._instance.post('/timers/start');
  };

  stopTimer = () => {
    return this._instance.post('/timers/stop');
  };
}

export default API;
