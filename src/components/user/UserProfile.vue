<template>
  <div class="user-profile">
    <div class="profile-header">
      <h2>My Profile</h2>
      <p>Manage your personal information and account details</p>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading your profile...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadProfile" class="retry-btn">Try Again</button>
    </div>

    <div v-else class="profile-content">
      <div class="profile-card">
        <div class="card-header">
          <h3>Profile Information</h3>
          <button 
            @click="toggleEditMode" 
            class="edit-btn"
            :disabled="saving"
          >
            {{ editing ? 'Cancel' : 'Edit' }}
          </button>
        </div>

        <form v-if="editing" @submit.prevent="saveProfile" class="details-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                id="email"
                :value="user.email"
                type="text"
                disabled
                class="readonly-field"
              />
            </div>
            
            <div class="form-group">
              <label for="display_name">Display Name:</label>
              <input
                id="display_name"
                v-model="editableUser.display_name"
                type="text"
                placeholder="Enter your display name"
              />
            </div>
            
            <div 
              v-for="(value, key) in editableUser.details" 
              :key="key" 
              class="form-group"
            >
              <label :for="key">{{ formatLabel(key) }}:</label>
              <input
                :id="key"
                v-model="editableUser.details[key]"
                type="text"
                :placeholder="'Enter your ' + formatLabel(key).toLowerCase()"
              />
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="button" 
              @click="toggleEditMode" 
              class="cancel-btn"
              :disabled="saving"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="save-btn"
              :disabled="saving || !hasChanges"
            >
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>

        <div v-else class="details-display">
          <div class="details-grid">
            <div class="detail-item">
              <label>Email:</label>
              <span>{{ user.email }}</span>
            </div>
            
            <div class="detail-item">
              <label>Display Name:</label>
              <span>{{ user.display_name || 'Not set' }}</span>
            </div>
            <div 
              v-for="(value, key) in user.details" 
              :key="key" 
              class="detail-item"
            >
              <label>{{ formatLabel(key) }}:</label>
              <span>{{ value || 'Not set' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="successMessage" class="success-message">
        <p>{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore.js';
import authService from '../../services/authService.js';

const authStore = useAuthStore();

const user = ref({});
const editableUser = reactive({
  display_name: '',
  details: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: ''
  }
});

const loading = ref(false);
const saving = ref(false);
const error = ref('');
const successMessage = ref('');
const editing = ref(false);

const hasChanges = computed(() => {
  if (!user.value || !user.value.details) {
    return false;
  }

  if (editableUser.display_name !== (user.value.display_name || '')) {
    return true;
  }

  const keys = new Set([
    ...Object.keys(user.value.details || {}),
    ...Object.keys(editableUser.details || {})
  ]);

  for (const key of keys) {
    const originalValue = (user.value.details && user.value.details[key]) || '';
    const editedValue = (editableUser.details && editableUser.details[key]) || '';
    if (originalValue !== editedValue) {
      return true;
    }
  }

  return false;
});

const formatLabel = (key) => {
  if (!key) return '';
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

const populateEditableUser = () => {
  if (!user.value) {
    return;
  }

  editableUser.display_name = user.value.display_name || '';
  
  const details = user.value.details || {};
  editableUser.details = {
    firstName: details.firstName || '',
    lastName: details.lastName || '',
    jobTitle: details.jobTitle || '',
    company: details.company || ''
  };
};

const loadProfile = async () => {
  loading.value = true;
  error.value = '';
  successMessage.value = '';

  try {
    const token = authStore.state.token;
    if (!token) {
      throw new Error('You must be logged in to view your profile.');
    }

    const profile = await authService.getCurrentUser(token);
    user.value = profile || {};

    if (!user.value.details) {
      user.value.details = {};
    }

    populateEditableUser();
  } catch (err) {
    error.value = err.message || 'Failed to load profile. Please try again.';
  } finally {
    loading.value = false;
  }
};

const toggleEditMode = () => {
  if (editing.value) {
    editing.value = false;
    populateEditableUser();
    error.value = '';
    successMessage.value = '';
    return;
  }

  editing.value = true;
  successMessage.value = '';
};

const saveProfile = async () => {
  if (!hasChanges.value) {
    return;
  }

  saving.value = true;
  error.value = '';
  successMessage.value = '';

  try {
    const token = authStore.state.token;
    if (!token) {
      throw new Error('You must be logged in to update your profile.');
    }

    const updateData = {
      display_name: editableUser.display_name,
      details: { ...editableUser.details }
    };

    const updatedProfile = await authService.updateCurrentUser(token, updateData);

    user.value = updatedProfile || {
      ...user.value,
      ...updateData
    };

    if (!user.value.details) {
      user.value.details = { ...updateData.details };
    }

    populateEditableUser();

    successMessage.value = 'Profile updated successfully.';
    editing.value = false;
  } catch (err) {
    error.value = err.message || 'Failed to update profile. Please try again.';
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
.user-profile {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.profile-header h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.profile-header p {
  color: #7f8c8d;
  margin: 0;
}

.profile-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header h3 {
  color: #2c3e50;
  margin: 0;
}

.edit-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.edit-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.edit-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.account-info {
  display: grid;
  gap: 15px;
}

.info-item {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #ecf0f1;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.info-item span {
  color: #7f8c8d;
  min-height: 20px;
}

.role-badge {
  background-color: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
}

.status-active {
  color: #27ae60;
  font-weight: 600;
}

.status-inactive {
  color: #e74c3c;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.detail-item label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.detail-item span {
  color: #7f8c8d;
  min-height: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 600;
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

.readonly-field {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ecf0f1;
}

.save-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:hover:not(:disabled) {
  background-color: #219a52;
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
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #7f8c8d;
}

.loading, .error, .success-message {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.loading {
  background-color: #f8f9fa;
  color: #7f8c8d;
}

.error {
  background-color: #ffeaea;
  color: #e74c3c;
  border: 1px solid #fadbd8;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.retry-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
</style>

