import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://localhost:5000',
});

class API {
  constructor() {
    this.instance = Instance;
  }

  getTimers = () => {
    return axios.get('/timers');
  };

  getTimer = id => {
    return axios.get(`/timers/${id}`, {
      params: {
        id,
      },
    });
  };

  addTimer = ({ title, minutes, seconds }) => {
    return axios.post(`/timers`, {
      title,
      minutes,
      seconds,
    });
  };

  deleteTimer = id => {
    return axios.delete(`/timers/${id}`);
  };

  clearTimers = () => {
    return axios.delete(`/timers`);
  };

  updateTimer = id => {
    return axios.patch(`/timers/${id}`, {
      title,
      minutes,
      seconds,
    });
  };
}

export default API;
