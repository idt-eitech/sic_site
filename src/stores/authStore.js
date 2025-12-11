import { reactive } from 'vue';
import authService from '../services/authService.js';

// Auth store for managing user authentication state
export const useAuthStore = () => {
  const state = reactive({
    token: localStorage.getItem('authToken') || null,
    user: JSON.parse(localStorage.getItem('authUser') || 'null'),
    isAuthenticated: !!localStorage.getItem('authToken'),
    isLoading: false,
    error: null
  });

  const actions = {
    // Set authentication state
    setAuth(token, user) {
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      
      // Persist to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));
    },

    // Clear authentication state
    clearAuth() {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    },

    // Set error
    setError(error) {
      state.error = error;
    },

    // Clear error
    clearError() {
      state.error = null;
    },

    // Login action
    async login(credentials) {
      state.isLoading = true;
      state.error = null;
      
      try {
        const response = await authService.login(credentials);
        
        // Get the full user profile after successful login
        const userProfile = await authService.getCurrentUser(response.token);
        
        actions.setAuth(response.token, userProfile);
        return response;
      } catch (error) {
        state.error = error.message;
        throw error;
      } finally {
        state.isLoading = false;
      }
    },

    // Register action
    async register(userData) {
      state.isLoading = true;
      state.error = null;
      
      try {
        const response = await authService.register(userData);
        return response;
      } catch (error) {
        state.error = error.message;
        throw error;
      } finally {
        state.isLoading = false;
      }
    },

    // Logout action
    async logout() {
      state.isLoading = true;
      
      try {
        if (state.token) {
          await authService.logout(state.token);
        }
        actions.clearAuth();
      } catch (error) {
        console.error('Logout error:', error);
        // Still clear auth even if logout API fails
        actions.clearAuth();
      } finally {
        state.isLoading = false;
      }
    },

    // Verify token validity
    async verifyToken() {
      if (!state.token) return false;
      
      try {
        const isValid = await authService.verifyToken(state.token);
        if (!isValid) {
          actions.clearAuth();
        }
        return isValid;
      } catch (error) {
        actions.clearAuth();
        return false;
      }
    }
  };

  return {
    state,
    actions
  };
};

// Create a singleton instance
export const authStore = useAuthStore();