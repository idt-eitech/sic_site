import { API_BASE_URL, apiCall, withAuth } from './api.js';

// Paper management services
export const paperService = {
  // Get all papers (admin gets all, regular users get their own)
  async getPapers(token) {
    return apiCall('/papers', withAuth(token));
  },

  // Upload a new paper
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

  // Accept a paper (admin only)
  async acceptPaper(token, paperId) {
    return apiCall(`/papers/${paperId}/accept`, {
      method: 'PATCH',
      ...withAuth(token),
    });
  },

  // Reject a paper (admin only)
  async rejectPaper(token, paperId) {
    return apiCall(`/papers/${paperId}/reject`, {
      method: 'PATCH',
      ...withAuth(token),
    });
  },

  // Helper to create form data for paper upload
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