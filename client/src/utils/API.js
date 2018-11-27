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

  removeTimer = id => {
    return axios.delete(`/timers/${id}`);
  };
}

export default API;
