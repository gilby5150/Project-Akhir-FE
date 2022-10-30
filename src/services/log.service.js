import api from './api';

class LogServices {
  getAllLog() {
    return api.get('/log');
  }

}

export default new LogServices();