// Base API configuration - uses environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  // Ensure Content-Type is always set to application/json for JSON requests
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Helper for authenticated API calls
function withAuth(token) {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
}

export { API_BASE_URL, apiCall, withAuth };