// API service for communicating with Flask backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // Use relative path in production
  : 'http://localhost:5000/api';  // Use full URL in development

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  // Helper method to get headers
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Helper method for file upload headers
  getFileHeaders(includeAuth = true) {
    const headers = {};

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(options.includeAuth !== false),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      includeAuth: false,
    });
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      includeAuth: false,
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async verifyToken(token) {
    return this.request('/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
      includeAuth: false,
    });
  }

  async getProfile() {
    return this.request('/auth/profile', {
      method: 'GET',
    });
  }

  // Alias for getProfile for compatibility
  async getCurrentUser() {
    return this.getProfile();
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  // File upload and processing methods
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/upload`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getFileHeaders(false), // Don't include auth for file upload
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Upload failed! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  async calculateQuote(quoteData) {
    return this.request('/calculate-quote', {
      method: 'POST',
      body: JSON.stringify(quoteData),
      includeAuth: false,
    });
  }

  async createQuote(quoteData) {
    return this.request('/create-quote', {
      method: 'POST',
      body: JSON.stringify(quoteData),
      includeAuth: false,
    });
  }

  async createOrder(orderData) {
    return this.request('/create-order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Order management methods
  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  async getOrder(orderId, email = null) {
    const params = email ? `?email=${encodeURIComponent(email)}` : '';
    return this.request(`/orders/${orderId}${params}`, {
      method: 'GET',
      includeAuth: !email, // Don't require auth if email is provided
    });
  }

  async getQuotes(email) {
    const params = new URLSearchParams({ email }).toString();
    return this.request(`/quotes?${params}`, {
      method: 'GET',
      includeAuth: false,
    });
  }

  // Token management
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Alias for setToken for compatibility
  setAuthToken(token) {
    this.setToken(token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  getToken() {
    return this.token || localStorage.getItem('auth_token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  // Health check
  async healthCheck() {
    return this.request('/health', {
      method: 'GET',
      includeAuth: false,
    });
  }

  // Get API documentation
  async getApiDocs() {
    return this.request('/docs', {
      method: 'GET',
      includeAuth: false,
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  register,
  login,
  verifyToken,
  getProfile,
  updateProfile,
  changePassword,
  uploadFile,
  calculateQuote,
  createQuote,
  createOrder,
  getOrders,
  getOrder,
  getQuotes,
  setToken,
  removeToken,
  getToken,
  isAuthenticated,
  healthCheck,
  getApiDocs,
} = apiService;

