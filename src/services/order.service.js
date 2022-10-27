import api from './api';

class OrderService {
  getAllOrder() {
    return api.get('/pembelian');
  }

  // getCategoryProduct(category) {
  //   return api.get(`/products?category=${category}`);
  // }

  // getDetailProduct(id) {
  //   return api.get(`/products/${id}`);
  // }

  createOrder(formData, config) {
    return api.post("/pembelian", {
      formData, config
    });
  }
}

export default new OrderService();