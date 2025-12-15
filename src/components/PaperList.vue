<template>
  <div class="paper-list">
    <div class="header">
      <h2>{{ isAdmin ? 'All Papers' : 'My Papers' }}</h2>
      <button v-if="isAdmin" @click="loadPapers" class="refresh-btn" :disabled="loading">
        {{ loading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading papers...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
      <button @click="loadPapers" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="papers.length === 0" class="empty">
      <p>No papers found.</p>
      <router-link v-if="!isAdmin" to="/paper-upload" class="upload-link">
        Upload your first paper
      </router-link>
    </div>

    <div v-else class="papers-grid">
      <div
        v-for="paper in papers"
        :key="paper.id"
        class="paper-card"
        @click="handlePaperClick(paper)"
      >
        <div class="paper-info">
          <h3>{{ paper.title }}</h3>
          <p class="description" v-if="paper.description">{{ paper.description }}</p>
          <div class="meta">
            <span class="status" :class="paper.status.toLowerCase()">
              {{ paper.status }}
            </span>
            <span class="date">
              Uploaded: {{ formatDate(paper.uploaded_at) }}
            </span>
            <span class="size" v-if="paper.file_size_bytes">
              {{ formatFileSize(paper.file_size_bytes) }}
            </span>
          </div>
          <div
            class="user-info"
            v-if="isAdmin && (paper.author_name || paper.author_email)"
          >
            <small>
              By:
              <span v-if="paper.author_name">{{ paper.author_name }}</span>
              <span v-if="paper.author_name && paper.author_email"> (</span>
              <span v-if="paper.author_email">{{ paper.author_email }}</span>
              <span v-if="paper.author_name && paper.author_email">)</span>
            </small>
          </div>
        </div>
        
        <div class="paper-actions" v-if="isAdmin && paper.status === 'PENDING'">
          <button 
            @click="acceptPaper(paper.id)" 
            class="accept-btn"
            :disabled="actionLoading[paper.id]"
          >
            {{ actionLoading[paper.id] === 'accept' ? 'Accepting...' : 'Accept' }}
          </button>
          <button 
            @click="rejectPaper(paper.id)" 
            class="reject-btn"
            :disabled="actionLoading[paper.id]"
          >
            {{ actionLoading[paper.id] === 'reject' ? 'Rejecting...' : 'Reject' }}
          </button>
        </div>

        <div class="paper-actions" v-else-if="!isAdmin">
          <span class="status-info">
            Your paper is {{ paper.status.toLowerCase() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/authStore';
import paperService from '../services/paperService';

const authStore = useAuthStore();
const papers = ref([]);
const loading = ref(false);
const error = ref('');
const actionLoading = ref({});

const isAdmin = computed(() => {
  return authStore.state.user?.role === 'ADMIN';
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const viewPaperFile = async (paper) => {
  try {
    error.value = '';

    const token = authStore.state.token;
    if (!token) {
      throw new Error('Not authenticated');
    }

    const blob = await paperService.getPaperFile(token, paper.id);
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
  } catch (err) {
    error.value = err.message || 'Failed to load paper file';
    console.error('Error viewing paper file:', err);
  }
};

const loadPapers = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const token = authStore.state.token;
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await paperService.getPapers(token);
    const items = Array.isArray(response.items) ? response.items : [];
    papers.value = items;
  } catch (err) {
    error.value = err.message || 'Failed to load papers';
    console.error('Error loading papers:', err);
  } finally {
    loading.value = false;
  }
};

const acceptPaper = async (paperId) => {
  await performPaperAction(paperId, 'accept', paperService.acceptPaper);
};

const rejectPaper = async (paperId) => {
  await performPaperAction(paperId, 'reject', paperService.rejectPaper);
};

const performPaperAction = async (paperId, actionType, actionFunction) => {
  actionLoading.value[paperId] = actionType;
  
  try {
    const token = authStore.state.token;
    await actionFunction(token, paperId);
    
    // Reload papers to get updated status
    await loadPapers();
  } catch (err) {
    error.value = `Failed to ${actionType} paper: ${err.message}`;
    console.error(`Error ${actionType}ing paper:`, err);
  } finally {
    actionLoading.value[paperId] = null;
  }
};

const handlePaperClick = (paper) => {
  if (isAdmin.value) {
    return;
  }

  viewPaperFile(paper);
};

// Load papers when component is mounted
onMounted(() => {
  if (authStore.state.isAuthenticated) {
    loadPapers();
  }
});

// Watch for authentication changes
watch(() => authStore.state.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    loadPapers();
  } else {
    papers.value = [];
  }
});
</script>

<style scoped>
.paper-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h2 {
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

.upload-link {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

.upload-link:hover {
  text-decoration: underline;
}

.papers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.paper-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.paper-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.paper-info h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.2em;
}

.description {
  color: #7f8c8d;
  margin: 0 0 15px 0;
  line-height: 1.4;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 0.9em;
  color: #95a5a6;
}

.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.8em;
}

.status.pending {
  background-color: #f39c12;
  color: white;
}

.status.accepted {
  background-color: #27ae60;
  color: white;
}

.status.rejected {
  background-color: #e74c3c;
  color: white;
}

.user-info {
  margin-bottom: 15px;
  padding-top: 10px;
  border-top: 1px solid #ecf0f1;
}

.user-info small {
  color: #7f8c8d;
}

.paper-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ecf0f1;
}

.accept-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.accept-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.reject-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.reject-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.status-info {
  color: #7f8c8d;
  font-style: italic;
}

@media (max-width: 768px) {
  .papers-grid {
    grid-template-columns: 1fr;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>
