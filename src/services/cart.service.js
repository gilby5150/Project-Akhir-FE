import api from './api';

class CartService {
  getAllCart() {
    return api.get('/cart');
  }

  async createCart(userId, productId, quantity, totalPrice) {
    const response = await api.post("/cart", {
      userId, productId, quantity, totalPrice
    });
    if (response.data) {
      console.log(response.data);
    }
    return response.data;
  }
}

export default new CartService();