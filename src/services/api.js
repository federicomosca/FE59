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
  return this.request('/users/get-all', {
    method: 'POST'
  });
}

  async createUser(userData) {
    return this.request('/users/signUp', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  static async loginUser(loginData, addOutput) {
    try {
      const result = await api.loginUser(loginData);
      addOutput(result === 'ok' ? 'Login successful' : 'Login failed');
    } catch (error) {
      addOutput(`Login error: ${error.message}`);
    }
  }
}

export default new Api();