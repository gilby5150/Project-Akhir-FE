import api from './api';

class OrderService {
  getAllOrder() {
    return api.get('/pembelian');
  }

  async createOrder(userId, productId, quantity, totalPrice, status) {
    const response = await api.post("/cart", {
      userId, productId, quantity, totalPrice, status
    });
    if (response.data) {
      console.log(response.data);
    }
    return response.data;
  }
}

export default new OrderService();