import { apiCall, withAuth } from './api.js';

// Authentication services
export const authService = {
  // Register new user
  async register(userData) {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  async login(credentials) {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Logout user
  async logout(token) {
    return apiCall('/auth/logout', {
      method: 'POST',
      ...withAuth(token),
    });
  },

  // Verify token validity
  async verifyToken(token) {
    try {
      // This would typically be a dedicated verify endpoint
      // For now, we'll use a simple paper list call to verify
      await apiCall('/papers', withAuth(token));
      return true;
    } catch (error) {
      return false;
    }
  },

  // Get current user profile
  async getCurrentUser(token) {
    return apiCall('/auth/me', withAuth(token));
  },

  // Update current user profile
  async updateCurrentUser(token, updates) {
    return apiCall('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(updates),
      ...withAuth(token)
    });
  }
};

export default authService;