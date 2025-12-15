import { API_BASE_URL, apiCall, withAuth } from './api.js';

export const paperService = {
  async getPapers(token, options = {}) {
    const params = new URLSearchParams();

    if (options.page != null) {
      params.set('page', String(options.page));
    }

    if (options.pageSize != null) {
      params.set('pageSize', String(options.pageSize));
    }

    if (options.status) {
      params.set('status', options.status);
    }

    const query = params.toString() ? `?${params.toString()}` : '';

    return apiCall(`/papers${query}`, withAuth(token));
  },

  async uploadPaper(token, formData) {
    const response = await fetch(`${API_BASE_URL}/papers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  },

  async acceptPaper(token, paperId) {
    return apiCall(`/papers/${paperId}/accept`, {
      method: 'PATCH',
      ...withAuth(token),
    });
  },

  async rejectPaper(token, paperId) {
    return apiCall(`/papers/${paperId}/reject`, {
      method: 'PATCH',
      ...withAuth(token),
    });
  },

  async getPaperFile(token, paperId) {
    const response = await fetch(`${API_BASE_URL}/papers/${paperId}/file`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.blob();
  },

  createPaperFormData(file, title, description = '') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    if (description) {
      formData.append('description', description);
    }
    return formData;
  }
};

export default paperService;
