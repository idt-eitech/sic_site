<template>
  <section class="section section--alt">
    <div class="container auth-shell">
      <div class="login-card card">
        <h2 class="title">Request for Preprint ID</h2>
        <div class="intro-text">
          <p>
            We assign DOI (Digital Object Identifier) to preprint papers on behalf of authors, similar to how arXiv
            assigns arXiv IDs. To submit your preprint paper and request a DOI, please log in or create an account.
          </p>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="credentials.email"
              type="email"
              required
              placeholder="Enter your email"
              :disabled="authStore.state.isLoading"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              placeholder="Enter your password"
              :disabled="authStore.state.isLoading"
            />
          </div>

          <div v-if="authStore.state.error" class="error-message">
            {{ authStore.state.error }}
          </div>

          <button type="submit" :disabled="authStore.state.isLoading" class="btn btn--primary login-button">
            <span v-if="authStore.state.isLoading">Logging in...</span>
            <span v-else>Log In</span>
          </button>
        </form>

        <p class="register-link">
          Don't have an account?
          <router-link to="/register">Register here</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '../../stores/authStore.js';

const router = useRouter();

const credentials = ref({
  email: '',
  password: ''
});

const handleLogin = async () => {
  try {
    await authStore.actions.login(credentials.value);
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<style scoped>
.auth-shell {
  display: flex;
  justify-content: center;
}

.login-card {
  padding: 22px;
  width: 100%;
  max-width: 440px;
}

.title {
  margin: 0 0 14px 0;
  text-align: left;
  letter-spacing: -0.02em;
}

.intro-text {
  background: rgba(11, 61, 145, 0.06);
  border: 1px solid rgba(11, 61, 145, 0.14);
  padding: 12px 12px;
  margin-bottom: 16px;
  border-radius: 12px;
}

.intro-text p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
  font-size: 0.95rem;
  text-align: left;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: 700;
  color: var(--text);
  font-size: 0.92rem;
}

input {
  padding: 12px 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: rgba(11, 61, 145, 0.6);
  box-shadow: 0 0 0 4px rgba(11, 61, 145, 0.12);
}

input:disabled {
  background-color: rgba(15, 23, 42, 0.03);
  cursor: not-allowed;
}

.error-message {
  color: #7f1d1d;
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
}

.login-button {
  width: 100%;
  justify-content: center;
}

.register-link {
  text-align: left;
  margin: 14px 0 0 0;
  color: var(--muted);
  font-weight: 600;
}

.register-link a {
  font-weight: 800;
}
</style>
