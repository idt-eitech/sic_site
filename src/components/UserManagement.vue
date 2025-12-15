<template>
  <div class="user-management">
    <div class="section-header">
      <h2>User Management</h2>
      <button @click="loadUsers" class="refresh-btn" :disabled="usersLoading">
        {{ usersLoading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <div class="filters">
      <div class="filter-group">
        <label for="emailFilter">Email</label>
        <input
          id="emailFilter"
          v-model="emailFilter"
          type="text"
          placeholder="Filter by email"
          :disabled="usersLoading"
        />
      </div>
      <div class="filter-group">
        <label for="nameFilter">Name</label>
        <input
          id="nameFilter"
          v-model="nameFilter"
          type="text"
          placeholder="Filter by name"
          :disabled="usersLoading"
        />
      </div>
      <button
        class="filter-btn"
        @click="applyFilters"
        :disabled="usersLoading"
      >
        Apply Filters
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
            <th>Name</th>
            <th>Company</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>
              {{ (user.details?.firstName || '') + ' ' + (user.details?.lastName || '') || 'N/A' }}
            </td>
            <td>{{ user.details?.company || 'N/A' }}</td>
            <td>{{ user.details?.mobile || 'N/A' }}</td>
            <td>
              <button 
                @click="toggleUserStatus(user)"
                class="details-btn"
                :disabled="userActionLoading[user.id]"
              >
                {{ user.is_active ? 'Disable' : 'Enable' }}
              </button>
              <span v-if="userActionLoading[user.id]" class="action-loading">
                Updating...
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button
          class="page-btn"
          @click="goToPreviousPage"
          :disabled="usersLoading || currentPage === 1"
        >
          Previous
        </button>
        <span class="page-info">
          Page {{ currentPage }} of {{ totalPages }} ({{ totalUsers }} users)
        </span>
        <button
          class="page-btn"
          @click="goToNextPage"
          :disabled="usersLoading || currentPage === totalPages"
        >
          Next
        </button>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import adminService from '../services/adminService';

const authStore = useAuthStore();

const users = ref([]);
const usersLoading = ref(false);
const usersError = ref('');
const userActionLoading = ref({});

const currentPage = ref(1);
const pageSize = ref(20);
const totalUsers = ref(0);
const totalPages = ref(1);

const emailFilter = ref('');
const nameFilter = ref('');

// User details modal
const showEditModal = ref(false);
const editingUser = ref(null);
const modalLoading = ref(false);
const modalSaving = ref(false);

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
    
    const response = await adminService.getUsers(token, {
      page: currentPage.value,
      pageSize: pageSize.value,
      email: emailFilter.value || undefined,
      name: nameFilter.value || undefined
    });

    const items = Array.isArray(response.items) ? response.items : [];
    users.value = items.filter(user => user.role !== 'ADMIN');
    totalUsers.value = typeof response.total === 'number' ? response.total : items.length;
    totalPages.value = typeof response.totalPages === 'number' && response.totalPages > 0 ? response.totalPages : 1;
  } catch (err) {
    usersError.value = err.message || 'Failed to load users';
    console.error('Error loading users:', err);
  } finally {
    usersLoading.value = false;
  }
};

const applyFilters = () => {
  currentPage.value = 1;
  loadUsers();
};

const goToPage = async (page) => {
  if (page < 1) {
    return;
  }

  if (page > totalPages.value) {
    return;
  }

  if (page === currentPage.value) {
    return;
  }

  currentPage.value = page;
  await loadUsers();
};

const goToPreviousPage = () => {
  if (usersLoading.value) {
    return;
  }

  if (currentPage.value <= 1) {
    return;
  }

  goToPage(currentPage.value - 1);
};

const goToNextPage = () => {
  if (usersLoading.value) {
    return;
  }

  if (currentPage.value >= totalPages.value) {
    return;
  }
  
  goToPage(currentPage.value + 1);
};

const toggleUserStatus = async (user) => {
  await updateUser(user.id, { is_active: !user.is_active });
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

// Load data when component is mounted
onMounted(() => {
  if (authStore.state.isAuthenticated && authStore.state.user?.role === 'ADMIN') {
    loadUsers();
  }
});
</script>

<style scoped>
.user-management {
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

.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 180px;
}

.filter-group label {
  margin-bottom: 4px;
  font-size: 0.85em;
  color: #7f8c8d;
}

.filter-group input {
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-group input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

.filter-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
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
  color: #2c3e50; /* Ensure text is visible */
}

.users-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

.users-table tr:hover {
  background-color: #f8f9fa;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.page-info {
  color: #7f8c8d;
  font-size: 0.9em;
}

.page-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.page-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
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

@media (max-width: 768px) {
  .users-table {
    font-size: 0.9em;
  }
  
  .users-table th,
  .users-table td {
    padding: 8px 6px;
  }
}
</style>
