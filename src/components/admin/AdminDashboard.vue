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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import adminService from '../../services/adminService';

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
  margin-bottom: 10px;
  color: #2c3e50;
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
  color: #3498db;
}

.dashboard-content {
  display: flex;
  justify-content: center;
}
</style>

