<template>
  <div class="paper-upload-container">
    <div class="upload-card">
      <h2>Upload Paper</h2>
      
      <div v-if="!authStore.state.isAuthenticated" class="auth-warning">
        <p>You need to be logged in to upload papers.</p>
        <router-link to="/login" class="login-link">Login here</router-link>
      </div>
      
      <form v-else @submit.prevent="handleUpload" class="upload-form" enctype="multipart/form-data">
        <div class="form-group">
          <label for="title">Paper Title *</label>
          <input
            id="title"
            v-model="paperData.title"
            type="text"
            required
            placeholder="Enter paper title"
            :disabled="isLoading"
          />
        </div>
        
        <div class="form-group">
          <label for="description">Abstract *</label>
          <textarea
            id="description"
            v-model="paperData.description"
            required
            placeholder="Enter paper abstract"
            :disabled="isLoading"
            rows="4"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="paperFile">Paper File *</label>
          <input
            id="paperFile"
            type="file"
            accept=".pdf,application/pdf"
            required
            :disabled="isLoading"
            @change="handleFileSelect"
          />
          <div class="field-help">Accepted format: PDF only (Max 10MB)</div>
        </div>
        
        <div v-if="selectedFile" class="file-info">
          <strong>Selected file:</strong> {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        
        <button
          type="submit"
          :disabled="isLoading || !selectedFile"
          class="upload-button"
        >
          <span v-if="isLoading">Uploading...</span>
          <span v-else>Upload Paper</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { authStore } from '../../stores/authStore.js';
import { paperService } from '../../services/paperService.js';

const isLoading = ref(false);
const error = ref('');
const successMessage = ref('');
const selectedFile = ref(null);

const paperData = reactive({
  title: '',
  description: ''
});

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      error.value = 'File size must be less than 10MB';
      selectedFile.value = null;
      return;
    }
    
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      error.value = 'Please select a PDF file only';
      selectedFile.value = null;
      return;
    }
    
    selectedFile.value = file;
    error.value = '';
  }
};

const handleUpload = async () => {
  if (!selectedFile.value) {
    error.value = 'Please select a file to upload';
    return;
  }
  
  isLoading.value = true;
  error.value = '';
  successMessage.value = '';
  
  try {
    const formData = new FormData();
    formData.append('title', paperData.title);
    if (paperData.description.trim()) {
      formData.append('description', paperData.description.trim());
    }
    formData.append('file', selectedFile.value);
    
    const response = await paperService.uploadPaper(authStore.state.token, formData);
    
    successMessage.value = 'Paper uploaded successfully!';
    
    paperData.title = '';
    paperData.description = '';
    selectedFile.value = null;
    document.getElementById('paperFile').value = '';
    
  } catch (err) {
    error.value = err.message || 'Upload failed. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.paper-upload-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  padding: 2rem;
}

.upload-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.auth-warning {
  text-align: center;
  padding: 2rem;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  color: #856404;
}

.login-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input, textarea, select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

input:disabled, textarea:disabled, select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

input[type="file"] {
  padding: 0.5rem;
}

.field-help {
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
}

.file-info {
  background: #e8f5e8;
  border: 1px solid #c3e6c3;
  padding: 0.75rem;
  border-radius: 4px;
  color: #155724;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6c3;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.upload-button {
  background-color: #28a745;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-button:hover:not(:disabled) {
  background-color: #218838;
}

.upload-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>

