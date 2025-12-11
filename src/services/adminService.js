import { apiCall, withAuth } from './api.js';

// Admin management services
export const adminService = {
  // Get all users (admin only)
  async getUsers(token) {
    return apiCall('/admin/users', withAuth(token));
  },

  // Update user role or status (admin only)
  async updateUser(token, userId, updates) {
    return apiCall(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      ...withAuth(token),
    });
  },

  // Helper to format user updates
  formatUserUpdates(updates) {
    const formatted = {};
    
    if (updates.role !== undefined) {
      formatted.role = updates.role;
    }
    
    if (updates.is_active !== undefined) {
      formatted.is_active = Boolean(updates.is_active);
    }
    
    if (updates.details !== undefined) {
      formatted.details = updates.details;
    }
    
    return formatted;
  }
};

export default adminService;