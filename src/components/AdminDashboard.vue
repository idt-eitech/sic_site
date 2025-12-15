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
          <h3>Total Papers</h3>
          <span class="stat-number">{{ stats.totalPapers }}</span>
        </div>
        <div class="stat-card">
          <h3>Pending Papers</h3>
          <span class="stat-number">{{ stats.pendingPapers }}</span>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="welcome-message">
        <h2>Welcome to Admin Dashboard</h2>
        <p>Use the navigation menu to access management features:</p>
        
        <div class="management-links">
          <router-link to="/admin/users" class="management-link">
            <div class="link-icon">👥</div>
            <div class="link-content">
              <h3>User Management</h3>
              <p>Manage user accounts, roles, and permissions</p>
            </div>
          </router-link>
          
          <router-link to="/admin/papers" class="management-link">
            <div class="link-icon">📄</div>
            <div class="link-content">
              <h3>Paper Management</h3>
              <p>Review, approve, and manage submitted papers</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/authStore';
import adminService from '../services/adminService';

const authStore = useAuthStore();

const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  totalPapers: 0,
  pendingPapers: 0
});

const loadStats = async () => {
  try {
    const token = authStore.state.token;
    if (!token) {
      return;
    }

    const response = await adminService.getStats(token);

    stats.value.totalUsers = typeof response.totalUsers === 'number' ? response.totalUsers : 0;
    stats.value.totalPapers = typeof response.totalPapers === 'number' ? response.totalPapers : 0;
    stats.value.pendingPapers = typeof response.pendingPapers === 'number' ? response.pendingPapers : 0;
  } catch (err) {
    console.error('Error loading admin stats:', err);
  }
};

onMounted(() => {
  if (authStore.state.isAuthenticated && authStore.state.user?.role === 'ADMIN') {
    loadStats();
  }
});

watch(() => authStore.state.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated && authStore.state.user?.role === 'ADMIN') {
    loadStats();
  } else {
    stats.value = {
      totalUsers: 0,
      activeUsers: 0,
      totalPapers: 0,
      pendingPapers: 0
    };
  }
});

const isAdmin = computed(() => {
  return authStore.state.user?.role === 'ADMIN';
});

watch(isAdmin, (isAdmin) => {
  if (!isAdmin && authStore.state.isAuthenticated) {
    window.location.href = '/';
  }
}, { immediate: true });
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  color: #7f8c8d;
  font-size: 0.9em;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.dashboard-content {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome-message {
  text-align: center;
}

.welcome-message h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.welcome-message p {
  color: #7f8c8d;
  font-size: 1.1em;
  margin-bottom: 30px;
}

.management-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.management-link {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 25px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;
}

.management-link:hover {
  background: #e9ecef;
  border-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.link-icon {
  font-size: 2.5em;
  margin-right: 20px;
  flex-shrink: 0;
}

.link-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.2em;
  color: #2c3e50;
}

.link-content p {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.95em;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 10px;
  }
  
  .dashboard-stats {
    grid-template-columns: 1fr;
  }
  
  .dashboard-content {
    padding: 20px;
  }
  
  .management-links {
    grid-template-columns: 1fr;
  }
  
  .management-link {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
  
  .link-icon {
    margin-right: 0;
    margin-bottom: 15px;
    font-size: 2em;
  }
}
</style>
