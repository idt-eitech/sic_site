<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Users</h3>
          <span class="stat-number">{{ stats.totalUsers }}</span>
        </div>
        <div class="stat-card">
          <h3>Active Users</h3>
          <span class="stat-number">{{ stats.activeUsers }}</span>
        </div>
        <div class="stat-card">
          <h3>Total Papers</h3>
          <span class="stat-number">{{ stats.totalPapers }}</span>
        </div>
        <div class="stat-card">
          <h3>Pending Papers</h3>
          <span class="stat-number">{{ stats.pendingPapers }}</span>
        </div>
      </div>
    </div>

    <div class="dashboard-tabs">
      <button 
        @click="activeTab = 'users'" 
        :class="['tab-button', { active: activeTab === 'users' }]"
      >
        User Management
      </button>
      <button 
        @click="activeTab = 'papers'" 
        :class="['tab-button', { active: activeTab === 'papers' }]"
      >
        Paper Management
      </button>
    </div>

    <div class="dashboard-content">
      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="tab-content">
        <div class="section-header">
          <h2>User Management</h2>
          <button @click="loadUsers" class="refresh-btn" :disabled="usersLoading">
            {{ usersLoading ? 'Loading...' : 'Refresh' }}
          </button>
        </div>

        <div v-if="usersLoading" class="loading">
          <p>Loading users...</p>
        </div>

        <div v-else-if="usersError" class="error">
          <p>Error: {{ usersError }}</p>
          <button @click="loadUsers" class="retry-btn">Retry</button>
        </div>

        <div v-else-if="users.length === 0" class="empty">
          <p>No users found.</p>
        </div>

        <div v-else class="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Display Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.display_name || 'N/A' }}</td>
                <td>
                  <select 
                    v-model="user.role" 
                    @change="updateUserRole(user)"
                    :disabled="userActionLoading[user.id]"
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td>
                  <select 
                    v-model="user.is_active" 
                    @change="updateUserStatus(user)"
                    :disabled="userActionLoading[user.id]"
                  >
                    <option :value="true">Active</option>
                    <option :value="false">Inactive</option>
                  </select>
                </td>
                <td>
                  {{ user.last_login_at ? formatDate(user.last_login_at) : 'Never' }}
                </td>
                <td>
                  <button 
                    @click="openEditDetails(user)"
                    class="details-btn"
                    :disabled="userActionLoading[user.id]"
                  >
                    Details
                  </button>
                  <span v-if="userActionLoading[user.id]" class="action-loading">
                    Updating...
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Edit Details Modal -->
      <div v-if="showEditModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>Edit User Details</h3>
            <button @click="closeEditModal" class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div v-if="modalLoading" class="modal-loading">
              <p>Loading details...</p>
            </div>
            <div v-else class="details-form">
              <div class="form-group">
                <label>First Name:</label>
                <input 
                  v-model="editingUser.details.firstName" 
                  type="text" 
                  placeholder="First Name"
                >
              </div>
              <div class="form-group">
                <label>Last Name:</label>
                <input 
                  v-model="editingUser.details.lastName" 
                  type="text" 
                  placeholder="Last Name"
                >
              </div>
              <div class="form-group">
                <label>Job Title:</label>
                <input 
                  v-model="editingUser.details.jobTitle" 
                  type="text" 
                  placeholder="Job Title"
                >
              </div>
              <div class="form-group">
                <label>Company:</label>
                <input 
                  v-model="editingUser.details.company" 
                  type="text" 
                  placeholder="Company"
                >
              </div>
              <div class="form-actions">
                <button 
                  @click="saveUserDetails" 
                  class="save-btn"
                  :disabled="modalSaving"
                >
                  {{ modalSaving ? 'Saving...' : 'Save Changes' }}
                </button>
                <button @click="closeEditModal" class="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Papers Tab -->
      <div v-else class="tab-content">
        <div class="section-header">
          <h2>Paper Management</h2>
          <p>Use the "Paper Management" link in the navigation to manage papers.</p>
        </div>
        <router-link to="/papers" class="nav-link">
          Go to Paper Management
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/authStore';
import adminService from '../services/adminService';
import paperService from '../services/paperService';

const authStore = useAuthStore();
const activeTab = ref('users');

// Users management
const users = ref([]);
const usersLoading = ref(false);
const usersError = ref('');
const userActionLoading = ref({});

// User details modal
const showEditModal = ref(false);
const editingUser = ref(null);
const modalLoading = ref(false);
const modalSaving = ref(false);

// Stats
const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  totalPapers: 0,
  pendingPapers: 0
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const loadUsers = async () => {
  usersLoading.value = true;
  usersError.value = '';
  
  try {
    const token = authStore.state.token;
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await adminService.getUsers(token);
    users.value = response;
    
    // Update stats
    stats.value.totalUsers = response.length;
    stats.value.activeUsers = response.filter(user => user.is_active).length;
  } catch (err) {
    usersError.value = err.message || 'Failed to load users';
    console.error('Error loading users:', err);
  } finally {
    usersLoading.value = false;
  }
};

const updateUserRole = async (user) => {
  await updateUser(user.id, { role: user.role });
};

const updateUserStatus = async (user) => {
  await updateUser(user.id, { is_active: user.is_active });
};

const updateUser = async (userId, updates) => {
  userActionLoading.value[userId] = true;
  
  try {
    const token = authStore.state.token;
    await adminService.updateUser(token, userId, updates);
    
    // Reload users to get updated data
    await loadUsers();
  } catch (err) {
    usersError.value = `Failed to update user: ${err.message}`;
    console.error('Error updating user:', err);
  } finally {
    userActionLoading.value[userId] = false;
  }
};

// User details modal methods
const openEditDetails = (user) => {
  editingUser.value = {
    ...user,
    details: user.details ? { ...user.details } : {}
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingUser.value = null;
  modalLoading.value = false;
  modalSaving.value = false;
};

const saveUserDetails = async () => {
  modalSaving.value = true;
  
  try {
    const token = authStore.state.token;
    const updates = {
      details: editingUser.value.details
    };
    
    await adminService.updateUser(token, editingUser.value.id, updates);
    
    // Reload users to get updated data
    await loadUsers();
    closeEditModal();
  } catch (err) {
    usersError.value = `Failed to update user details: ${err.message}`;
    console.error('Error updating user details:', err);
  } finally {
    modalSaving.value = false;
  }
};

const loadPaperStats = async () => {
  try {
    const token = authStore.state.token;
    if (!token) return;
    
    const papers = await paperService.getPapers(token);
    stats.value.totalPapers = papers.length;
    stats.value.pendingPapers = papers.filter(paper => paper.status === 'PENDING').length;
  } catch (err) {
    console.error('Error loading paper stats:', err);
  }
};

// Load data when component is mounted
onMounted(() => {
  if (authStore.state.isAuthenticated && authStore.state.user?.role === 'ADMIN') {
    loadUsers();
    loadPaperStats();
  }
});

// Watch for authentication changes
watch(() => authStore.state.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated && authStore.state.user?.role === 'ADMIN') {
    loadUsers();
    loadPaperStats();
  } else {
    users.value = [];
    stats.value = { totalUsers: 0, activeUsers: 0, totalPapers: 0, pendingPapers: 0 };
  }
});

// Check if user is admin
const isAdmin = computed(() => {
  return authStore.state.user?.role === 'ADMIN';
});

// Redirect if not admin
watch(isAdmin, (isAdmin) => {
  if (!isAdmin && authStore.state.isAuthenticated) {
    // Redirect to home if user is not admin
    window.location.href = '/';
  }
}, { immediate: true });
</script>

<style scoped>
.admin-dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-header {
  margin-bottom: 30px;
}

.dashboard-header h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin: 0 0 10px 0;
  color: #7f8c8d;
  font-size: 0.9em;
  font-weight: normal;
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
  color: #2c3e50;
}

.dashboard-tabs {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 30px;
}

.tab-button {
  background: none;
  border: none;
  padding: 15px 30px;
  cursor: pointer;
  font-size: 1em;
  color: #7f8c8d;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.tab-button:hover {
  color: #2c3e50;
}

.tab-button.active {
  color: #3498db;
  border-bottom-color: #3498db;
  font-weight: bold;
}

.dashboard-content {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  color: #2c3e50;
  margin: 0;
}

.refresh-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.refresh-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.loading, .error, .empty {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

.error {
  color: #e74c3c;
}

.retry-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.users-table {
  overflow-x: auto;
}

.users-table table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
}

.users-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

.users-table tr:hover {
  background-color: #f8f9fa;
}

.details-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8em;
  margin-right: 5px;
}

.details-btn:hover:not(:disabled) {
  background-color: #219a52;
}

.details-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #2c3e50;
}

.modal-body {
  padding: 20px;
}

.modal-loading {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

.details-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 500;
  color: #2c3e50;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.save-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.save-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #95a5a6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #7f8c8d;
}

.users-table select {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.users-table select:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.action-loading {
  color: #7f8c8d;
  font-style: italic;
}

.nav-link {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 15px;
}

.nav-link:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .dashboard-stats {
    grid-template-columns: 1fr;
  }
  
  .dashboard-tabs {
    flex-direction: column;
  }
  
  .tab-button {
    text-align: center;
  }
  
  .section-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .users-table {
    font-size: 0.9em;
  }
  
  .users-table th,
  .users-table td {
    padding: 8px 6px;
  }
}
</style>