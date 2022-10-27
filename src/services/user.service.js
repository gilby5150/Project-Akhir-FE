import api from './api';

class UserService {
  // getPublicContent() {
  //   return api.get('/test/all');
  // }

  // getUserBoard() {
  //   return api.get('/test/user');
  // }

  getSuperAdminBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }

  getDetailUser(username) {
    return api.get(`/users/${username}`);
  }
  
  updateUser(id,data) {
    return api.post(`/users/${id}`,data);
  }

  getUserRole() {
    return api.get(`/userRole`);
  }

  getUserId(userId) {
    return api.get(`/userRole/${userId}`);
  }

  updateRoleId(userId, data) {
    return api.put(`/userRole/${userId}`,data);
  }
}

export default new UserService();