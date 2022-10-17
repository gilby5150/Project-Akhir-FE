import api from './api';

class ProductService {
  getAllProduct() {
    return api.get('/products');
  }

  getDetailProduct(id) {
    return api.get(`/products/${id}`);
  }

  createProduct(formData, config) {
    return api.post("/products", {
      formData, config
    });
  }

  // updateProduct(id, data) {
  //   return api.put(`/products/${id}`, data);
  // }
  // deleteProduct(id) {
  //   return api.delete(`/products/${id}`);
  // }
  // deleteAllProduct() {
  //   return api.delete(`/products`);
  // }
  // findByTitle(productName) {
  //   return api.get(`/products?productName=${productName}`);
  // }
}

export default new ProductService();