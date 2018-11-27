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
}

export default API;
