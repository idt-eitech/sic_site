<template>
  <div class="paper-management">
    <div class="section-header">
      <h2>Paper Management</h2>
      <button @click="loadPapers" class="refresh-btn" :disabled="papersLoading">
        {{ papersLoading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <div v-if="papersLoading" class="loading">
      <p>Loading papers...</p>
    </div>

    <div v-else-if="papersError" class="error">
      <p>Error: {{ papersError }}</p>
      <button @click="loadPapers" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="papers.length === 0" class="empty">
      <p>No papers found.</p>
    </div>

    <div v-else class="papers-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paper in papers" :key="paper.id">
            <td>{{ paper.id }}</td>
            <td>{{ paper.title || 'Untitled' }}</td>
            <td>{{ paper.author_name || 'Unknown' }}</td>
            <td>
              <span :class="['status-badge', paper.status.toLowerCase()]">
                {{ paper.status }}
              </span>
            </td>
            <td>
              {{ paper.uploaded_at ? formatDate(paper.uploaded_at) : 'Unknown' }}
            </td>
            <td>
              <button 
                @click="viewPaper(paper)"
                class="view-btn"
                :disabled="paperActionLoading[paper.id]"
              >
                View
              </button>
              <button 
                v-if="paper.status === 'PENDING'"
                @click="approvePaper(paper)"
                class="approve-btn"
                :disabled="paperActionLoading[paper.id]"
              >
                Approve
              </button>
              <button 
                v-if="paper.status === 'PENDING'"
                @click="rejectPaper(paper)"
                class="reject-btn"
                :disabled="paperActionLoading[paper.id]"
              >
                Reject
              </button>
              <span v-if="paperActionLoading[paper.id]" class="action-loading">
                Processing...
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import paperService from '../services/paperService';

const authStore = useAuthStore();

// Papers management
const papers = ref([]);
const papersLoading = ref(false);
const papersError = ref('');
const paperActionLoading = ref({});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const loadPapers = async () => {
  papersLoading.value = true;
  papersError.value = '';
  
  try {
    const token = authStore.state.token;
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await paperService.getPapers(token);
    papers.value = response;
  } catch (err) {
    papersError.value = err.message || 'Failed to load papers';
    console.error('Error loading papers:', err);
  } finally {
    papersLoading.value = false;
  }
};

const viewPaper = (paper) => {
  // Implement paper viewing logic
  console.log('View paper:', paper);
  // You might want to open a modal or navigate to a detailed view
};

const approvePaper = async (paper) => {
  await updatePaperStatus(paper.id, 'APPROVED');
};

const rejectPaper = async (paper) => {
  await updatePaperStatus(paper.id, 'REJECTED');
};

const updatePaperStatus = async (paperId, status) => {
  paperActionLoading.value[paperId] = true;
  
  try {
    const token = authStore.state.token;
    await paperService.updatePaperStatus(token, paperId, status);
    
    // Reload papers to get updated data
    await loadPapers();
  } catch (err) {
    papersError.value = `Failed to update paper: ${err.message}`;
    console.error('Error updating paper:', err);
  } finally {
    paperActionLoading.value[paperId] = false;
  }
};

// Load data when component is mounted
onMounted(() => {
  if (authStore.state.isAuthenticated && authStore.state.user?.role === 'ADMIN') {
    loadPapers();
  }
});
</script>

<style scoped>
.paper-management {
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

.papers-table {
  overflow-x: auto;
}

.papers-table table {
  width: 100%;
  border-collapse: collapse;
}

.papers-table th,
.papers-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
  color: #2c3e50;
}

.papers-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

.papers-table tr:hover {
  background-color: #f8f9fa;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
}

.status-badge.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-badge.approved {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.rejected {
  background-color: #f8d7da;
  color: #721c24;
}

.view-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8em;
  margin-right: 5px;
}

.view-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.approve-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8em;
  margin-right: 5px;
}

.approve-btn:hover:not(:disabled) {
  background-color: #218838;
}

.reject-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8em;
  margin-right: 5px;
}

.reject-btn:hover:not(:disabled) {
  background-color: #c82333;
}

.view-btn:disabled,
.approve-btn:disabled,
.reject-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.action-loading {
  color: #7f8c8d;
  font-style: italic;
}

@media (max-width: 768px) {
  .papers-table {
    font-size: 0.9em;
  }
  
  .papers-table th,
  .papers-table td {
    padding: 8px 6px;
  }
  
  .view-btn,
  .approve-btn,
  .reject-btn {
    margin-bottom: 5px;
  }
}
</style>