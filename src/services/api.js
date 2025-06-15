// services/api.js
const BASE_URL = 'http://localhost:8080';

class Api {
  async request(url, options = {}) {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    return response.json();
  }

  async getUsers() {
    return this.request('/users');
  }

  async createUser(userData) {
    return this.request('/users/signUp', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }
}

export default new Api();