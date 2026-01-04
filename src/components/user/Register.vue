<template>
  <section id="register" class="register-section">
    <div class="register-container">
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
          <button type="submit" class="submit-btn">Create Account</button>
          <button type="button" class="cancel-btn" @click="$router.push('/')">Cancel</button>
        </div>
      </form>
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
.register-section {
  padding: 3rem 2rem;
  background: #f5f7fa;
  color: #1a237e;
}
.register-container {
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(26,35,126,0.06);
  padding: 2rem 2.5rem;
}
.tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
}
.tab {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  color: #1a237e;
  text-decoration: none;
}
.tab.active {
  border-bottom: 3px solid #1a237e;
}
.tab + .tab {
  margin-left: 1rem;
}
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #1a237e;
}
input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
input:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.15);
}
.field-help {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #666;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
.submit-btn {
  background: #1a237e;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
.submit-btn:hover {
  background: #303f9f;
}
.cancel-btn {
  background: #e0e0e0;
  color: #333;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-btn:hover {
  background: #d5d5d5;
}
.error-message {
  padding: 0.75rem 1rem;
  background: #ffebee;
  color: #c62828;
  border-radius: 4px;
  margin-bottom: 1rem;
}
@media (max-width: 600px) {
  .register-container {
    padding: 1.5rem;
  }
  .form-row {
    flex-direction: column;
  }
}
</style>

