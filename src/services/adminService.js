import { apiCall, withAuth } from './api.js';

export const adminService = {
  async getUsers(token, options = {}) {
    const params = new URLSearchParams();

    if (options.page != null) {
      params.set('page', String(options.page));
    }

    if (options.pageSize != null) {
      params.set('pageSize', String(options.pageSize));
    }

    if (options.email) {
      params.set('email', options.email);
    }

    if (options.name) {
      params.set('name', options.name);
    }

    const query = params.toString() ? `?${params.toString()}` : '';

    return apiCall(`/admin/users${query}`, withAuth(token));
  },

  async getStats(token) {
    return apiCall('/admin/stats', withAuth(token));
  },

  async updateUser(token, userId, updates) {
    return apiCall(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      ...withAuth(token),
    });
  },

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
