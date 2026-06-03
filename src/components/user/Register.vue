<template>
  <section id="register" class="section section--alt">
    <div class="container">
      <div class="register-container card">
      <div class="tabs">
        <div class="tab active">Create new account</div>
        <router-link to="/login" class="tab">Log in</router-link>
      </div>

      <form @submit.prevent="handleSubmit" class="register-form">
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email address *</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
            >
            <div class="field-help">A valid email address. All emails from the system will be sent to this address.</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="password">Password *</label>
            <input 
              type="password" 
              id="password" 
              v-model="form.password" 
              required
            >
            <div class="field-help">Create a strong password with at least 6 characters.</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="confirmPassword">Confirm Password *</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="form.confirmPassword" 
              required
            >
            <div class="field-help">Please confirm your password.</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="display_name">Display Name *</label>
            <input 
              type="text" 
              id="display_name" 
              v-model="form.display_name"
              placeholder="How you want to be displayed"
              required
            >
            <div class="field-help">This will be shown to other users instead of your email.</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input 
              type="text" 
              id="firstName" 
              v-model="form.firstName"
              placeholder="Your first name"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input 
              type="text" 
              id="lastName" 
              v-model="form.lastName"
              placeholder="Your last name"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="company">Company *</label>
            <input 
              type="text" 
              id="company" 
              v-model="form.company"
              placeholder="Your company or institution"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="mobile">Mobile *</label>
            <input 
              type="tel" 
              id="mobile" 
              v-model="form.mobile"
              placeholder="Your mobile number"
              required
            >
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn--primary submit-btn">Create Account</button>
          <button type="button" class="btn btn--ghost cancel-btn" @click="$router.push('/')">Cancel</button>
        </div>
      </form>
    </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../services/authService'

const router = useRouter()
const error = ref('')
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  display_name: '',
  firstName: '',
  lastName: '',
  company: '',
  mobile: ''
})

const handleSubmit = async () => {
  error.value = ''
  
  if (!form.display_name.trim()) {
    error.value = 'Display Name is required'
    return
  }
  
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  
  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return
  }
  
  loading.value = true
  
  try {
    const registrationData = {
      email: form.email,
      password: form.password
    }
    
    if (form.display_name.trim()) {
      registrationData.display_name = form.display_name.trim()
    }
    
    const details = {}
    if (form.firstName.trim()) {
      details.firstName = form.firstName.trim()
    }
    if (form.lastName.trim()) {
      details.lastName = form.lastName.trim()
    }
    if (form.company.trim()) {
      details.company = form.company.trim()
    }
    if (form.mobile.trim()) {
      details.mobile = form.mobile.trim()
    }
    
    if (Object.keys(details).length > 0) {
      registrationData.details = details
    }
    
    await authService.register(registrationData)
    router.push('/login')
  } catch (err) {
    error.value = err.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 22px;
}
.tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}
.tab {
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 800;
  color: var(--muted);
  text-decoration: none;
  border-radius: 12px 12px 0 0;
}
.tab.active {
  color: var(--text);
  border-bottom: 3px solid var(--primary);
}
.tab + .tab {
  margin-left: 1rem;
}
.register-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form-row {
  display: flex;
  gap: 1rem;
}
.form-group {
  flex: 1;
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
.field-help {
  margin-top: 6px;
  font-size: 0.85rem;
  color: var(--muted);
  font-weight: 600;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 16px;
  flex-wrap: wrap;
}
.error-message {
  padding: 10px 12px;
  background: #fee2e2;
  color: #7f1d1d;
  border: 1px solid #fecaca;
  border-radius: 12px;
}
@media (max-width: 600px) {
  .register-container {
    padding: 18px;
  }
  .form-row {
    flex-direction: column;
  }
}
</style>
