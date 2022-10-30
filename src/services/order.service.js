import api from './api';

class OrderService {
  getAllOrder() {
    return api.get('/pembelian');
  }

  async createOrder(userId, productId, quantity, totalPrice, payment, status) {
    const response = await api.post("/pembelian", {
      userId, productId, quantity, totalPrice, payment, status
    });
    if (response.data) {
      console.log(response.data);
    }
    return response.data;
  }

  async createOrderCart(userId, productId, quantity, totalPrice, payment, status) {
    const response = await api.post("/pembelian/cart", {
      userId, productId, quantity, totalPrice, payment, status
    });
    if (response.data) {
      console.log(response.data);
    }
    return response.data;
  }
}

export default new OrderService();